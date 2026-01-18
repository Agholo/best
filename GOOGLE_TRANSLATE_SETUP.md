# Google Translate API Setup

This project uses Google Translate API to automatically translate category names when they are created.

## Setup Instructions

1. **Get a Google Cloud API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "Cloud Translation API"
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Copy your API key

2. **Add the API Key to your environment:**
   - Create or update your `.env.local` file in the root directory
   - Add the following line:
   ```
   GOOGLE_TRANSLATE_API_KEY=your_api_key_here
   ```

3. **Restart your development server:**
   - The API key will be loaded on server startup

## How It Works

When you create a category:
1. The category name is automatically translated to all supported languages (Armenian, Russian)
2. Translations are saved to the translation JSON files in `public/locales/{lang}/categories.json`
3. The category key is generated from the category name (e.g., "Smartphones" → "smartphones")

## Supported Languages

- **en** (English) - Original language
- **am** (Armenian) - Translated via Google Translate
- **ru** (Russian) - Translated via Google Translate

## Notes

- If the API key is not set, translations will be skipped but category creation will still succeed
- Translation errors are logged but don't prevent category creation
- Translations are stored in JSON files and can be manually edited if needed

