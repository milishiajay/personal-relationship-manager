# Personal Relationship Manager

A comprehensive web application built with Next.js for managing personal relationships, tracking interactions, and maintaining meaningful connections with friends, family, and colleagues.

## Features

### 🧑‍🤝‍🧑 Rich Contact Profiles
- Detailed contact information with profile photos
- Personal notes and relationship context
- Contact history and important dates
- Customizable fields for personal details

### 📝 Interaction Tracking
- Log conversations, meetings, and activities
- Track communication frequency and patterns
- Set interaction goals and reminders
- View interaction history timeline

### 📸 Shared Albums
- Create photo albums for shared memories
- Organize photos by events or relationships
- Easy photo upload and management
- Visual timeline of shared experiences

### 📅 Timeline View
- Chronological view of all interactions
- Filter by contact, date, or interaction type
- Visual representation of relationship history
- Quick access to past conversations and events

### 🔔 Smart Reminders
- Automated reminders to stay in touch
- Customizable reminder intervals
- Birthday and anniversary notifications
- Follow-up reminders for important conversations

### 🏷️ Groups & Tags
- Organize contacts into custom groups
- Tag-based categorization system
- Filter and search by groups or tags
- Bulk actions for group management

### 📊 Data Export
- Export contact data in various formats
- Backup and restore functionality
- Privacy-focused data management
- Import from other contact management systems

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with better-sqlite3
- **Icons**: Lucide React
- **File Handling**: Multer for uploads
- **Date Handling**: Built-in JavaScript Date API

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/milishiajay/personal-relationship-manager.git
cd personal-relationship-manager
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
```bash
npm run init-db
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality
- `npm run init-db` - Initialize the SQLite database

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── contacts/       # Contact management pages
│   │   ├── interactions/   # Interaction tracking pages
│   │   ├── albums/         # Photo album pages
│   │   └── timeline/       # Timeline view pages
│   ├── components/         # Reusable React components
│   ├── lib/               # Utility functions and database
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
├── uploads/              # User uploaded files
└── database.db          # SQLite database file
```

## Features in Detail

### Contact Management
- Add, edit, and delete contacts
- Rich profile information including photos
- Personal notes and relationship context
- Contact search and filtering

### Interaction Logging
- Record various types of interactions (calls, meetings, messages)
- Add notes and context to each interaction
- Track interaction frequency and patterns
- Set follow-up reminders

### Photo Albums
- Create albums for shared memories
- Upload and organize photos by events
- Associate albums with specific contacts
- Visual timeline of shared experiences

### Smart Reminders
- Automated reminders based on interaction patterns
- Customizable reminder intervals
- Birthday and anniversary notifications
- Email-style reminder system

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Privacy & Security

This application is designed with privacy in mind:
- All data is stored locally in SQLite
- No external data transmission
- User-controlled data export and backup
- No tracking or analytics

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and TypeScript