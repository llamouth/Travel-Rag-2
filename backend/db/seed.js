// seed.js
const db = require('./dbConfig');
const generateEmbedding = require('../utils/generateEmbedding');
const fs = require('fs').promises;
const path = require('path');

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

        // Seed destinations with embeddings
        const destinations = [
            { name: 'Mountain Retreat', description: 'A peaceful mountain getaway.', location: 'Alps', image_url: 'mountain.jpg' },
            { name: 'Beach Paradise', description: 'A sunny beach destination.', location: 'Maldives', image_url: 'beach.jpg' }
        ];

        for (const destination of destinations) {
            const textToEmbed = `${destination.name} ${destination.description} ${destination.location}`;
            const embedding = await generateEmbedding(textToEmbed);
            if (embedding) {
                await db.none(`
                    INSERT INTO destinations (name, description, location, image_url, embedding)
                    VALUES ($1, $2, $3, $4, $5)
                `, [destination.name, destination.description, destination.location, destination.image_url, embedding]);
            }
        }
        console.log('Destinations seeded successfully!');

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
            {
              user_id: 1,
              preferred_activities: 'hiking',
              vacation_budget: 5000,
              location: 'mountains',
              favorite_season: 'summer',
            },
            {
              user_id: 2,
              preferred_activities: 'swimming',
              vacation_budget: 3000,
              location: 'beaches',
              favorite_season: 'summer',
            },
        ];
          
        for (const preference of userPreferences) {
            const embedding = await generateEmbedding(
              `${preference.preferred_activities} ${preference.vacation_budget} ${preference.location} ${preference.favorite_season}`
            );
            if (embedding) {
              await db.none(
                `
                INSERT INTO user_preferences (user_id, preferred_activities, vacation_budget, location, favorite_season, preferences_embedding)
                VALUES ($1, $2, $3, $4, $5, $6)
                `,
                [
                  preference.user_id,
                  preference.preferred_activities,
                  preference.vacation_budget,
                  preference.location,
                  preference.favorite_season,
                  embedding,
                ]
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