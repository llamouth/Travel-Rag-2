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
            ('jane_doe', 'jane@example.com', 'password123', 'profile2.jpg', 'Bio for Jane Doe', 'Jane', 'Doe'),
            ('alice_smith', 'alice@example.com', 'password123', 'profile3.jpg', 'Bio for Alice Smith', 'Alice', 'Smith'),
            ('bob_jones', 'bob@example.com', 'password123', 'profile4.jpg', 'Bio for Bob Jones', 'Bob', 'Jones'),
            ('charlie_brown', 'charlie@example.com', 'password123', 'profile5.jpg', 'Bio for Charlie Brown', 'Charlie', 'Brown'),
            ('diana_white', 'diana@example.com', 'password123', 'profile6.jpg', 'Bio for Diana White', 'Diana', 'White'),
            ('edward_green', 'edward@example.com', 'password123', 'profile7.jpg', 'Bio for Edward Green', 'Edward', 'Green'),
            ('fiona_black', 'fiona@example.com', 'password123', 'profile8.jpg', 'Bio for Fiona Black', 'Fiona', 'Black'),
            ('george_king', 'george@example.com', 'password123', 'profile9.jpg', 'Bio for George King', 'George', 'King'),
            ('helen_lee', 'helen@example.com', 'password123', 'profile10.jpg', 'Bio for Helen Lee', 'Helen', 'Lee')
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

        // // Seed kaggle_data (as before)
        // const kaggleData = await fs.readFile(path.join(__dirname, 'data', 'mountains_vs_beaches_preferences.csv'), 'utf8');
        // const rows = kaggleData.split('\n').slice(1);

        // let kaggleCount = 0;

        // for (const row of rows) {
        //     const values = row.split(',');

        //     if (values.length === 14) {
        //         const userText = values.join(',');
        //         const embedding = await generateEmbedding(userText);

        //         if (embedding) {
        //             const petsBoolean = values[11] === '1';
        //             const envConcernsBoolean = values[12] === '1';
        //             const preferenceBoolean = values[13] === '1';

        //             await db.none(`
        //                 INSERT INTO kaggle_data (age, gender, income, education_level, travel_frequency, preferred_activities, vacation_budget, location, proximity_to_mountains, proximity_to_beaches, favorite_season, pets, environmental_concerns, preference, user_text, embedding) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        //                 [ ...values.slice(0, 11), petsBoolean, envConcernsBoolean, preferenceBoolean, userText, embedding ]
        //             );

        //             kaggleCount++;
        //         }
        //     }
        // }

        // console.log(`Kaggle data seeded successfully! ${kaggleCount} rows inserted.`);

        // Seed user_preferences with embeddings
        const userPreferences = [
            { user_id: 1, preferred_activities: 'hiking', travel_style: 'adventurous', interests: 'nature', specific_keywords: 'mountains', budget: 'medium', preferred_season: 'summer', location_type: 'mountains', accommodation_type: 'Hotel', transportation_type: 'Car' },
            { user_id: 2, preferred_activities: 'swimming', travel_style: 'relaxing', interests: 'beaches', specific_keywords: 'ocean', budget: 'low', preferred_season: 'summer', location_type: 'beach', accommodation_type: 'Villa', transportation_type: 'Flight' },
            { user_id: 3, preferred_activities: 'museums', travel_style: 'cultural', interests: 'history, art', specific_keywords: 'Rome, Florence', budget: 'high', preferred_season: 'autumn', location_type: 'city', accommodation_type: 'Hotel', transportation_type: 'Train' },
            { user_id: 4, preferred_activities: 'nightlife', travel_style: 'luxury', interests: 'dining, shopping', specific_keywords: 'Dubai, Tokyo', budget: 'high', preferred_season: 'winter', location_type: 'city', accommodation_type: 'Resort', transportation_type: 'Flight' },
            { user_id: 5, preferred_activities: 'wildlife', travel_style: 'adventure', interests: 'safari, nature', specific_keywords: 'South Africa, Kenya', budget: 'medium', preferred_season: 'spring', location_type: 'countryside', accommodation_type: 'Lodge', transportation_type: 'Car' },
            { user_id: 6, preferred_activities: 'skiing', travel_style: 'adventure', interests: 'mountains, winter sports', specific_keywords: 'Switzerland, Austria', budget: 'high', preferred_season: 'winter', location_type: 'mountains', accommodation_type: 'Chalet', transportation_type: 'Train' },
            { user_id: 7, preferred_activities: 'food tours', travel_style: 'cultural', interests: 'local cuisine, markets', specific_keywords: 'Thailand, Vietnam', budget: 'low', preferred_season: 'autumn', location_type: 'city', accommodation_type: 'Hostel', transportation_type: 'Bus' },
            { user_id: 8, preferred_activities: 'sailing', travel_style: 'relaxing', interests: 'islands, beaches', specific_keywords: 'Greece, Caribbean', budget: 'medium', preferred_season: 'summer', location_type: 'beach', accommodation_type: 'Boat', transportation_type: 'Ferry' },
            { user_id: 9, preferred_activities: 'ancient ruins', travel_style: 'historical', interests: 'archaeology, history', specific_keywords: 'Egypt, Peru', budget: 'medium', preferred_season: 'spring', location_type: 'city', accommodation_type: 'Hotel', transportation_type: 'Flight' },
            { user_id: 10, preferred_activities: 'road trips', travel_style: 'adventure', interests: 'scenic drives, national parks', specific_keywords: 'USA, Canada', budget: 'low', preferred_season: 'summer', location_type: 'countryside', accommodation_type: 'Camping', transportation_type: 'Car' },
        ];

        for (const preference of userPreferences) {
            const preferencesText = `${preference.preferred_activities} ${preference.travel_style} ${preference.interests} ${preference.specific_keywords} ${preference.budget} ${preference.preferred_season} ${preference.location_type} ${preference.accommodation_type} ${preference.transportation_type}`;

            const embedding = await generateEmbedding(preferencesText);

            if (embedding) {
                await db.none(
                    `
                    INSERT INTO user_preferences (user_id, preferred_activities, travel_style, interests, specific_keywords, budget, preferred_season, location_type, accommodation_type, transportation_type, embedding)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                    `,
                    [
                        preference.user_id,
                        preference.preferred_activities,
                        preference.travel_style,
                        preference.interests,
                        preference.specific_keywords,
                        preference.budget,
                        preference.preferred_season,
                        preference.location_type,
                        preference.accommodation_type,
                        preference.transportation_type,
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
            (2, 2),
            (3, 3),
            (4, 4),
            (5, 5),
            (6, 6),
            (7, 7),
            (8, 8),
            (9, 9),
            (10, 10)
        `);
        console.log('User favorites seeded successfully!');

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase();