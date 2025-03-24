// seed.js
const db = require('./dbConfig');
const generateEmbedding = require('../utils/generateEmbedding');
const fs = require('fs').promises;
const path = require('path');
const csv = require('csv-parser');
const destinations = require('./data/destinations.json')

async function seedDatabase() {
    try {
        // Seed users (as before)
        await db.none(`
            INSERT INTO users (username, email, password_hash, profile_picture, bio, first_name, last_name)
            VALUES
            ('john_doe', 'john@example.com', 'password123', 'profile1.jpg', 'Bio for John Doe', 'John', 'Doe'),
            ('jane_doe', 'jane@example.com', 'password123', 'profile2.jpg', 'Bio for Jane Doe', 'Jane', 'Doe')
        `);
        console.log('Users seeded successfully!');

        // Seed destinations data

        let destinationsCount = 0;

        for (const destination of destinations) {
            const {
                destination: destinationName,
                search_terms,
                similarity_terms,
                description,
            } = destination;

            const textForEmbedding = `${destinationName}, ${search_terms.join(', ')}, ${similarity_terms.join(', ')}`;
            const embedding = await generateEmbedding(textForEmbedding);

            if (embedding) {
                await db.none(
                    `
                    INSERT INTO destinations (
                        destination, search_terms, similarity_terms, description, embedding
                    ) VALUES (
                        $1, $2, $3, $4, $5
                    )
                    `,
                    [
                        destinationName,
                        search_terms,
                        similarity_terms,
                        description,
                        embedding,
                    ]
                );
                destinationsCount++;
            }
        }

        console.log(`Seeded ${destinationsCount} destinations.`);

        // Seed kaggle_data (as before)
        const kaggleData = await fs.readFile(path.join(__dirname, 'data', 'mountains_vs_beaches_preferences.csv'), 'utf8');
        const rows = kaggleData.split('\n').slice(1);

        let kaggleCount = 0;

        for (const row of rows) {
            const values = row.split(',');

            if (values.length === 14) {
                const userText = values.join(',');
                const embedding = await generateEmbedding(userText);

                if (embedding) {
                    const petsBoolean = values[11] === '1';
                    const envConcernsBoolean = values[12] === '1';
                    const preferenceBoolean = values[13] === '1';

                    await db.none(`
                        INSERT INTO kaggle_data (age, gender, income, education_level, travel_frequency, preferred_activities, vacation_budget, location, proximity_to_mountains, proximity_to_beaches, favorite_season, pets, environmental_concerns, preference, user_text, embedding) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
                        [ ...values.slice(0, 11), petsBoolean, envConcernsBoolean, preferenceBoolean, userText, embedding ]
                    );

                    kaggleCount++;
                }
            }
        }

        console.log(`Kaggle data seeded successfully! ${kaggleCount} rows inserted.`);

        // Seed user_preferences with embeddings
        const userPreferences = [
            { user_id: 1, preferred_activities: 'hiking', vacation_budget: 5000, location: 'mountains', favorite_season: 'summer', start_date: '2024-07-01', end_date: '2024-07-15', duration_days: 14, accommodation_type: 'Hotel', transportation_type: 'Car', traveler_age: 30, traveler_gender: 'Male', traveler_nationality: 'American', pets: false, environmental_concerns: true, travel_frequency: 'Monthly', income: 60000, education_level: 'Bachelor'},
            { user_id: 2, preferred_activities: 'swimming', vacation_budget: 3000, location: 'beaches', favorite_season: 'summer', start_date: '2024-08-01', end_date: '2024-08-07', duration_days: 7, accommodation_type: 'Villa', transportation_type: 'Flight', traveler_age: 25, traveler_gender: 'Female', traveler_nationality: 'Canadian', pets: true, environmental_concerns: false, travel_frequency: 'Yearly', income: 45000, education_level: 'Associate' },
        ];

        for (const preference of userPreferences) {
            const embedding = await generateEmbedding(
                `${preference.preferred_activities} ${preference.vacation_budget} ${preference.location} ${preference.favorite_season} ${preference.start_date} ${preference.end_date} ${preference.accommodation_type} ${preference.transportation_type}`
            );

            if (embedding) {
                await db.none(
                    `
                    INSERT INTO user_preferences (user_id, preferred_activities, vacation_budget, location, favorite_season, start_date, end_date, duration_days, accommodation_type, transportation_type, traveler_age, traveler_gender, traveler_nationality, pets, environmental_concerns, travel_frequency, income, education_level, embedding)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
                    `,
                    [ preference.user_id, preference.preferred_activities, preference.vacation_budget, preference.location, preference.favorite_season, preference.start_date, preference.end_date, preference.duration_days, preference.accommodation_type, preference.transportation_type, preference.traveler_age, preference.traveler_gender, preference.traveler_nationality, preference.pets, preference.environmental_concerns, preference.travel_frequency, preference.income, preference.education_level, embedding ]
                );
            }
        }

        console.log('User preferences seeded successfully!');

        // Seed user_favorites (as before)
        await db.none(`
            INSERT INTO user_favorites (user_id, destination_id)
            VALUES
            (1, 1),
            (2, 2)
        `);
        console.log('User favorites seeded successfully!');

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase();