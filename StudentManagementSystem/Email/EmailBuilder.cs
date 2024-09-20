namespace StudentManagementSystem.Email
{
    public class EmailBuilder
    {
        public string BuildExamResultEmail(string studentName, string examName, int studentId, string subject, decimal mark, string graade)
        {
            // Create the email body as a string
            string emailBody = $@"
        <!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Exam Results</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }}
                .email-container {{
                    background-color: #ffffff;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }}
                .header {{
                    text-align: center;
                    background-color: #4CAF50;
                    color: white;
                    padding: 20px;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 24px;
                }}
                .content {{
                    padding: 20px;
                    color: #333333;
                    line-height: 1.6;
                }}
                .content h2 {{
                    color: #4CAF50;
                }}
                .table {{
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }}
                .table th, .table td {{
                    border: 1px solid #dddddd;
                    padding: 10px;
                    text-align: left;
                }}
                .table th {{
                    background-color: #4CAF50;
                    color: white;
                }}
                .footer {{
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    color: #888888;
                }}
            </style>
        </head>
        <body>

        <div class='email-container'>
            <div class='header'>
                <h1>Exam Results Notification</h1>
            </div>

            <div class='content'>
                <p>Dear <strong>{studentName}</strong>,</p>
                <p>We are pleased to inform you that your exam results have been released. Below are your details and the marks obtained:</p>

                <h2>Exam Details:</h2>
                <table class='table'>
                    <tr>
                        <th>Exam Name</th>
                        <td>{examName}</td>
                    </tr>
                    <tr>
                        <th>Subject</th>
                        <td>{subject}</td>
                    </tr>
                    <tr>
                        <th>Mark Obtained</th>
                        <td>{mark}%</td>
                    </tr>
                    
                     <tr>
                        <th>Grade</th>
                        <td>{graade}%</td>
                    </tr>

                </table>

                <p>We congratulate you on completing this exam, and we encourage you to keep striving for success in your academic journey.</p>
                <p>For any inquiries, please contact our support team.</p>

                <p>Best regards,<br>Examination Department</p>
            </div>

            <div class='footer'>
                <p>&copy; 2024 Your School Name. All rights reserved.</p>
            </div>
        </div>

        </body>
        </html>";

            // Return the email body
            return emailBody;
        }
    }
}

