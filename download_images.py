#!/usr/bin/env python3
"""
Скрипт для загрузки всех изображений с Яндекс.Диска
Использование: python3 download_images.py
"""

import requests
import os
import time
from pathlib import Path

# Конфигурация
PUBLIC_KEY = "https://disk.yandex.ru/d/vWmmIN00mV7SoQ"
OUTPUT_DIR = "public/img"
API_BASE = "https://cloud-api.yandex.net/v1/disk/public/resources"

# Категории и их маппинг
CATEGORIES = {
    "Ванные комнаты": "bathroom",
    "Гардеробные": "wardrobe",
    "Гостиная": "living-room",
    "Декор": "decor",
    "Детские": "children-room",
    "Кухня": "kitchen",
    "Мягкие панели": "soft-panel",
    "Офис": "office",
    "Прихожая": "hallway",
    "Спальня": "bedroom",
    "Торговое оборудование": "trade-equipment"
}

def get_folder_contents(path=""):
    """Получить содержимое папки через API"""
    params = {
        "public_key": PUBLIC_KEY,
        "limit": 1000
    }
    if path:
        params["path"] = path
    
    response = requests.get(API_BASE, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Ошибка получения папки {path}: {response.status_code}")
        return None

def get_download_url(file_path):
    """Получить прямую ссылку на скачивание файла"""
    params = {
        "public_key": PUBLIC_KEY,
        "path": file_path
    }
    
    response = requests.get(f"{API_BASE}/download", params=params)
    if response.status_code == 200:
        return response.json().get("href")
    else:
        print(f"Ошибка получения ссылки для {file_path}: {response.status_code}")
        return None

def download_file(url, filepath):
    """Скачать файл по URL"""
    try:
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            return True
        else:
            print(f"Ошибка скачивания: {response.status_code}")
            return False
    except Exception as e:
        print(f"Ошибка: {e}")
        return False

def main():
    """Основная функция"""
    # Создать директорию если не существует
    Path(OUTPUT_DIR).mkdir(parents=True, exist_ok=True)
    
    print("🚀 Начинаю загрузку изображений с Яндекс.Диска...")
    print(f"📁 Папка назначения: {OUTPUT_DIR}\n")
    
    total_downloaded = 0
    total_files = 0
    
    # Получить список папок
    root_contents = get_folder_contents()
    if not root_contents:
        print("❌ Не удалось получить доступ к папке")
        return
    
    # Обработать каждую категорию
    for folder_item in root_contents.get("_embedded", {}).get("items", []):
        if folder_item.get("type") != "dir":
            continue
        
        folder_name = folder_item.get("name")
        if folder_name not in CATEGORIES:
            continue
        
        prefix = CATEGORIES[folder_name]
        print(f"📂 Обрабатываю категорию: {folder_name} ({prefix})")
        
        # Получить файлы в папке
        folder_path = f"/{folder_name}"
        folder_contents = get_folder_contents(folder_path)
        
        if not folder_contents:
            continue
        
        file_counter = 1
        for file_item in folder_contents.get("_embedded", {}).get("items", []):
            if file_item.get("type") != "file":
                continue
            
            file_name = file_item.get("name")
            file_path = file_item.get("path")
            
            # Пропустить не-изображения
            if not file_name.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                continue
            
            total_files += 1
            
            # Получить расширение
            ext = os.path.splitext(file_name)[1]
            
            # Новое имя файла
            new_filename = f"{prefix}-{file_counter}{ext}"
            output_path = os.path.join(OUTPUT_DIR, new_filename)
            
            # Проверить, уже скачан ли файл
            if os.path.exists(output_path):
                print(f"  ⏭️  {new_filename} уже существует, пропускаю")
                file_counter += 1
                total_downloaded += 1
                continue
            
            # Получить ссылку на скачивание
            download_url = get_download_url(file_path)
            if not download_url:
                print(f"  ❌ Не удалось получить ссылку для {file_name}")
                continue
            
            # Скачать файл
            print(f"  ⬇️  Скачиваю {new_filename}...", end=" ")
            if download_file(download_url, output_path):
                file_size = os.path.getsize(output_path) / 1024  # KB
                print(f"✅ ({file_size:.1f} KB)")
                total_downloaded += 1
                file_counter += 1
            else:
                print("❌")
            
            # Пауза между запросами
            time.sleep(0.3)
        
        print()
    
    print(f"\n🎉 Готово! Скачано {total_downloaded} из {total_files} файлов")
    print(f"📁 Все файлы сохранены в: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
