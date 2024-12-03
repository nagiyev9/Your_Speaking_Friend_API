# Your Speaking Friend API

This is the API for **Your Speaking Friend**, a platform that connects users for English language practice and improvement. The API manages user authentication, email notifications, data handling, and secure interactions with the database.

## Features

- User authentication with JWT.
- Rate limiting and security enhancements using \`helmet\` and \`express-rate-limit\`.
- Integration with Supabase for database operations.
- Email notifications using \`nodemailer\`.
- Environment-specific configurations.

## Repository

GitHub: [Your_Speaking_Friend_API](https://github.com/nagiyev9/Your_Speaking_Friend_API.git)

## Requirements

- Node.js (v16 or higher)
- PostgreSQL database
- Supabase account (for additional data handling)
- `.env` file containing the following:

```bash
JWT_SECRET=your-jwt-secret
JWT_SECRET_KEY=your-jwt-secret-key
NODE_ENV=development-or-production
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
CONNECTION_URL=your-postgresql-connection-url
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nagiyev9/Your_Speaking_Friend_API.git
   cd Your_Speaking_Friend_API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the required environment variables.

4. Start the API server:
   - For production:
     ```bash
     npm run prod
     ```
   - For development:
     ```bash
     npm run dev
     ```

## Project Structure

- **index.js**: Main entry point for the API.
- **Dependencies**:
  - `@supabase/supabase-js`: For interacting with Supabase.
  - `bcrypt`: For password hashing.
  - `cookie-parser`: For handling cookies.
  - `cors`: For cross-origin resource sharing.
  - `dotenv`: For environment variable management.
  - `express`: Web framework.
  - `express-rate-limit` & `helmet`: For security and rate limiting.
  - `jsonwebtoken`: For JWT-based authentication.
  - `nodemailer`: For sending emails.
  - `pg` & `sequelize`: For PostgreSQL integration.
  - `winston`: For logging.

## Usage

1. Set up the PostgreSQL database and configure the required tables.
2. Configure Supabase and integrate it with the API for enhanced functionality.
3. Use the provided endpoints to interact with the API for user management, email notifications, and data operations.

## License

This project is licensed under the MIT License.



Start building secure and efficient APIs with **Your Speaking Friend API**! 🚀
