// seed.js
const db = require('./dbConfig');
const generateEmbedding = require('../utils/generateEmbedding');
const destinations = require('./data/destinations.json')

async function seedDatabase() {
    try {

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

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

seedDatabase();