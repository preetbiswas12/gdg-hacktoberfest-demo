# Complete Google Sheets Form Setup Guide

This guide walks you through creating a React form that submits data directly to Google Sheets using Google Apps Script.

## 📋 Prerequisites

- Google account
- React project setup
- Basic understanding of JavaScript/TypeScript

## 🚀 Step-by-Step Setup

### Step 1: Create Google Sheet

1. **Create a new Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Click "Blank" to create a new spreadsheet
   - Name your spreadsheet (e.g., "Student Registrations")

2. **Set up column headers**
   - In row 1, add these headers:
     ```
     A1: Timestamp
     B1: Name  
     C1: Email
     D1: Phone
     E1: AdmissionID
     F1: GithubURL
     ```
   - Rename the sheet tab to "Submissions" (right-click on "Sheet1" → "Rename")

### Step 2: Create Google Apps Script

1. **Open Apps Script Editor**
   - In your Google Sheet, go to `Extensions` → `Apps Script`
   - Delete any existing code in the editor

2. **Add the Apps Script code**
   ```javascript
  function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Submissions");
    var params = e.parameter;

    // Append row with the new column structure
    sheet.appendRow([
      new Date(),                    // Timestamp
      params.Name || "",             // Name
      params.Email || "",            // Email
      params.Phone || "",            // Phone
      params.AdmissionID || "",      // AdmissionID
      params.GithubURL || ""         // GithubURL
    ]);

    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success",
      message: "Registration submitted successfully" 
    }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: err.toString() 
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Function to set up the sheet headers (run this once)
// Optional: Function to set up the sheet headers (run this once)
function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Submissions");
  
  // Clear existing headers and set new ones
  sheet.getRange(1, 1, 1, 6).clearContent();
  sheet.getRange(1, 1, 1, 6).setValues([
    ["Timestamp", "Name", "Email", "Phone", "AdmissionID", "GithubURL"]
  ]);
  
  // Optional: Format the header row
  sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
  sheet.getRange(1, 1, 1, 6).setBackground("#f0f0f0");
}

```

3. **Save the script**
   - Click the save icon (💾) or `Ctrl+S`
   - Give your project a name (e.g., "Form Submission Handler")

### Step 3: Deploy Apps Script as Web App

1. **Deploy the script**
   - Click `Deploy` → `New deployment`
   - Click the gear icon ⚙️ next to "Type"
   - Select `Web app`

2. **Configure deployment settings**
   - **Description**: "Form submission handler"
   - **Execute as**: "Me (your-email@gmail.com)"
   - **Who has access**: "Anyone" 
   - Click `Deploy`

3. **Authorize the script**
   - Click `Authorize access`
   - Choose your Google account
   - Click `Advanced` → `Go to [your project name] (unsafe)`
   - Click `Allow`

4. **Copy the Web App URL**
   - After deployment, you'll see a "Web app URL"
   - **Copy this URL** - you'll need it for the `.env` file
   - It looks like: `https://script.google.com/macros/s/[SCRIPT_ID]/exec`

### Step 4: Set Up Environment Variables

1. **Rename environment file**
   ```bash
   # In your React project root directory
   mv .env.example .env
   ```

2. **Add the Google Sheets URL**
   ```env
   # .env file
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
   Replace `YOUR_SCRIPT_ID` with the actual URL you copied from Step 3.

### Step 5: Add React Form Component

1. **Install required dependencies**
   ```bash
   npm install lucide-react
   ```

2. **Create the form component**
   - Copy the provided `GoogleSheetsForm.tsx` component
   - Place it in your `src/components/` directory

3. **Create CSS file**
   ```bash
   touch src/components/GoogleSheetsForms.css
   ```

4. **Add basic CSS styling**
   ```css
   .form-container {
     max-width: 1200px;
     margin: 0 auto;
     padding: 2rem;
   }

   .form-grid {
     display: grid;
     grid-template-columns: 1fr 1fr;
     gap: 2rem;
     align-items: start;
   }

   .left-section h2 {
     font-size: 2rem;
     margin-bottom: 1rem;
     color: #333;
   }

   .left-section p {
     font-size: 1.1rem;
     color: #666;
     line-height: 1.6;
   }

   .form-card {
     background: white;
     padding: 2rem;
     border-radius: 8px;
     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   }

   .input-wrapper {
     position: relative;
     margin-bottom: 1.5rem;
   }

   .input-icon {
     position: absolute;
     left: 12px;
     top: 12px;
     width: 20px;
     height: 20px;
     color: #666;
   }

   input, textarea {
     width: 100%;
     padding: 12px 12px 12px 45px;
     border: 2px solid #e1e5e9;
     border-radius: 6px;
     font-size: 16px;
     transition: border-color 0.3s;
   }

   input:focus, textarea:focus {
     outline: none;
     border-color: #4f46e5;
   }

   button {
     width: 100%;
     background: #4f46e5;
     color: white;
     padding: 12px 24px;
     border: none;
     border-radius: 6px;
     font-size: 16px;
     cursor: pointer;
     display: flex;
     align-items: center;
     justify-content: center;
     transition: background-color 0.3s;
   }

   button:hover:not(:disabled) {
     background: #4338ca;
   }

   button:disabled {
     background: #9ca3af;
     cursor: not-allowed;
   }

   .error-message {
     color: #ef4444;
     font-size: 14px;
     margin-top: 5px;
   }

   @media (max-width: 768px) {
     .form-grid {
       grid-template-columns: 1fr;
       gap: 1rem;
     }
   }
   ```

### Step 6: Use the Component

1. **Import and use in your app**
   ```tsx
   // App.tsx or your main component
   import GoogleSheetsForm from './components/GoogleSheetsForm';

   function App() {
     return (
       <div className="App">
         <GoogleSheetsForm />
       </div>
     );
   }

   export default App;
   ```

### Step 7: Test the Setup

1. **Start your React development server**
   ```bash
   npm run dev
   # or
   npm start
   ```

2. **Test form submission**
   - Fill out all form fields
   - Click "Submit Registration"
   - Check your Google Sheet for the new row of data

3. **Verify data mapping**
   - Timestamp should auto-populate
   - All form fields should appear in correct columns

## 🔧 Troubleshooting

### Common Issues:

1. **Form not submitting**
   - Check if `.env` file has correct URL
   - Ensure Apps Script is deployed as "Anyone" can access

2. **Data not appearing in sheet**
   - Verify sheet name is "Submissions"
   - Check column headers match exactly
   - Look at Apps Script execution logs

3. **CORS errors**
   - Apps Script web apps handle CORS automatically
   - Ensure you're using the web app URL, not the editor URL

4. **Environment variable not loading**
   - Restart your React dev server after adding `.env`
   - Make sure variable starts with `VITE_`

### Debug Steps:

1. **Check Apps Script logs**
   - Go to Apps Script editor → `Executions`
   - Look for error messages

2. **Test Apps Script directly**
   - Use a tool like Postman to send POST request
   - Send form data to your web app URL

3. **Browser network tab**
   - Open Developer Tools → Network
   - Submit form and check for failed requests

## 🎉 Success!

Once everything is working, you should see:
- Form submissions creating new rows in your Google Sheet
- Timestamps automatically generated
- All form data properly mapped to columns
- Success message displayed to users

## 📝 Next Steps

- Add form validation enhancements
- Style the form to match your brand
- Add email notifications using Apps Script
- Create data visualization from your sheet data
- Export data periodically for analysis

---

**Need help?** Check the browser console for error messages and verify each step above. Most issues stem from incorrect URLs or permission settings.