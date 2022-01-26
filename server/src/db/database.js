mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on(
    'error',
    console.error.bind(
        console,
        'An error occurred while connecting to MongoDB 😭: '
    )
);