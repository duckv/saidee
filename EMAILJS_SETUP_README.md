# EmailJS Template Setup Guide for Bread N' Br☕︎w

## 🔑 Your EmailJS Configuration
- **Service ID**: `service_aw0glyl`
- **Public API Key**: `21LVan48_eVuxeqqS`
- **Contact Template ID**: `template_wvgv8q5`
- **Catering Template ID**: `template_jt6z1vk`

## 📝 Template Variables

### Contact Form Template (`template_wvgv8q5`)
Your JavaScript sends these variables:
```javascript
{
  from_name: "Customer Name",
  from_email: "customer@email.com",
  phone: "555-123-4567",
  subject: "General Inquiry",
  message: "Customer's message content"
}
```

### Catering Form Template (`template_jt6z1vk`)
Your JavaScript sends these variables:
```javascript
{
  from_name: "Customer Name",
  from_email: "customer@email.com", 
  phone: "555-123-4567",
  event_date: "2024-12-25",
  event_type: "Wedding",
  guest_count: "50",
  package_interest: "Wedding Desserts",
  details: "Additional event details"
}
```

## 🎨 HTML Template Examples

### Contact Form Email Template
Copy this into your EmailJS `template_wvgv8q5`:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #E91E63, #d29f51); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #E91E63; }
        .value { background: white; padding: 8px; border-left: 3px solid #d29f51; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🍞 New Contact Form Submission</h1>
            <p>Bread N' Br☕︎w Contact Form</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">👤 Customer Name:</div>
                <div class="value">{{from_name}}</div>
            </div>
            
            <div class="field">
                <div class="label">📧 Email Address:</div>
                <div class="value">{{from_email}}</div>
            </div>
            
            <div class="field">
                <div class="label">📞 Phone Number:</div>
                <div class="value">{{phone}}</div>
            </div>
            
            <div class="field">
                <div class="label">📋 Subject:</div>
                <div class="value">{{subject}}</div>
            </div>
            
            <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">{{message}}</div>
            </div>
            
            <hr style="margin: 20px 0;">
            <p><small>Submitted via Bread N' Br☕︎w website contact form</small></p>
        </div>
    </div>
</body>
</html>
```

### Catering Form Email Template
Copy this into your EmailJS `template_jt6z1vk`:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #E91E63, #d29f51); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #E91E63; }
        .value { background: white; padding: 8px; border-left: 3px solid #d29f51; margin-top: 5px; }
        .highlight { background: linear-gradient(135deg, #E91E63, #d29f51); color: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 New Catering Inquiry</h1>
            <p>Bread N' Br☕︎w Catering Request</p>
        </div>
        
        <div class="content">
            <div class="highlight">
                <strong>Event Date: {{event_date}} | Guest Count: {{guest_count}}</strong>
            </div>
            
            <div class="field">
                <div class="label">👤 Customer Name:</div>
                <div class="value">{{from_name}}</div>
            </div>
            
            <div class="field">
                <div class="label">📧 Email Address:</div>
                <div class="value">{{from_email}}</div>
            </div>
            
            <div class="field">
                <div class="label">📞 Phone Number:</div>
                <div class="value">{{phone}}</div>
            </div>
            
            <div class="field">
                <div class="label">📅 Event Date:</div>
                <div class="value">{{event_date}}</div>
            </div>
            
            <div class="field">
                <div class="label">���� Event Type:</div>
                <div class="value">{{event_type}}</div>
            </div>
            
            <div class="field">
                <div class="label">👥 Guest Count:</div>
                <div class="value">{{guest_count}} guests</div>
            </div>
            
            <div class="field">
                <div class="label">📦 Package Interest:</div>
                <div class="value">{{package_interest}}</div>
            </div>
            
            <div class="field">
                <div class="label">📝 Additional Details:</div>
                <div class="value">{{details}}</div>
            </div>
            
            <hr style="margin: 20px 0;">
            <p><small>Submitted via Bread N' Br☕︎w website catering form</small></p>
        </div>
    </div>
</body>
</html>
```

## ⚙️ Setup Instructions

### Step 1: Login to EmailJS Dashboard
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Login with your account

### Step 2: Update Contact Template
1. Go to "Templates" section
2. Click on template `template_wvgv8q5`
3. Replace the content with the "Contact Form Email Template" above
4. Set the subject line to: `New Contact from {{from_name}} - {{subject}}`
5. Save the template

### Step 3: Update Catering Template  
1. Click on template `template_jt6z1vk`
2. Replace the content with the "Catering Form Email Template" above
3. Set the subject line to: `Catering Inquiry: {{event_type}} for {{guest_count}} guests on {{event_date}}`
4. Save the template

### Step 4: Test the Forms
1. Go to your website
2. Fill out the contact form - you should receive an email with all fields
3. Fill out the catering form - you should receive an email with all event details

## 🚨 Common Issues & Solutions

### Problem: Only getting the message field
**Solution**: Make sure your template uses the exact variable names with double curly braces `{{variable_name}}`

### Problem: Variables showing as blank
**Solution**: Check that the JavaScript variable names match exactly:
- `from_name` (not `name`)
- `from_email` (not `email`) 
- `guest_count` (not `guests`)

### Problem: Emails not sending
**Solution**: 
1. Check browser console for errors
2. Verify Service ID and Template IDs are correct
3. Make sure Public API Key is set correctly

## 📧 Email Subject Lines

**Contact Form Subject**: `New Contact from {{from_name}} - {{subject}}`
**Catering Form Subject**: `Catering Inquiry: {{event_type}} for {{guest_count}} guests on {{event_date}}`

## 🔧 Advanced Customization

You can customize the templates further by:
- Adding your business logo
- Changing colors to match your brand
- Adding conditional content based on variables
- Including auto-reply functionality

## 📞 Support
If you have issues, check:
1. Browser console for JavaScript errors
2. EmailJS dashboard for template syntax errors
3. Form field names match template variables exactly
