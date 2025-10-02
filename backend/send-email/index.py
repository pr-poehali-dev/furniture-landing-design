import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка заявок с сайта на email
    Args: event с httpMethod, body (name, phone, email, message)
          context с request_id
    Returns: HTTP response
    '''
    method: str = event.get('httpMethod', 'GET')
    print(f"Request method: {method}")
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        name = body_data.get('name', '')
        phone = body_data.get('phone', '')
        email = body_data.get('email', '')
        message = body_data.get('message', '')
        
        if not name or not phone:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Имя и телефон обязательны'})
            }
        
        smtp_email = os.environ.get('EMAIL_SENDER')
        smtp_password = os.environ.get('EMAIL_PASSWORD')
        recipient_email = 'mihail-dutchak@mail.ru'
        
        print(f"Checking credentials - Email: {smtp_email[:10] if smtp_email else 'None'}, Password exists: {bool(smtp_password)}")
        
        if not smtp_email or not smtp_password:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'error': 'Email не настроен. Добавьте секреты EMAIL_SENDER и EMAIL_PASSWORD'
                })
            }
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новая заявка с сайта от {name}'
        msg['From'] = smtp_email
        msg['To'] = recipient_email
        
        text = f"""
Новая заявка с сайта!

Имя: {name}
Телефон: {phone}
Email: {email if email else 'не указан'}

Сообщение:
{message if message else 'без сообщения'}

Дата: {datetime.now().strftime('%d.%m.%Y %H:%M')}
        """
        
        html = f"""
<html>
<body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px;">🎉 Новая заявка с сайта!</h2>
        
        <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #34495e;">👤 Имя:</strong> {name}</p>
            <p style="margin: 10px 0;"><strong style="color: #34495e;">📱 Телефон:</strong> <a href="tel:{phone}" style="color: #3498db; text-decoration: none;">{phone}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #34495e;">📧 Email:</strong> {f'<a href="mailto:{email}" style="color: #3498db; text-decoration: none;">{email}</a>' if email else 'не указан'}</p>
        </div>
        
        {f'<div style="background-color: #ecf0f1; padding: 15px; border-radius: 5px; margin: 20px 0;"><strong style="color: #34495e;">💬 Сообщение:</strong><p style="margin: 10px 0; color: #555;">{message}</p></div>' if message else ''}
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ecf0f1; color: #7f8c8d; font-size: 12px;">
            <p>📅 Дата получения: {datetime.now().strftime('%d.%m.%Y %H:%M')}</p>
        </div>
    </div>
</body>
</html>
        """
        
        part1 = MIMEText(text, 'plain', 'utf-8')
        part2 = MIMEText(html, 'html', 'utf-8')
        
        msg.attach(part1)
        msg.attach(part2)
        
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(smtp_email, smtp_password)
        server.send_message(msg)
        server.quit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка отправки: {str(e)}'})
        }