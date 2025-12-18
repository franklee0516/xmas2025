# -*- coding: utf-8 -*-
import json
import os
import sys

# 1. 這裡直接 print，確保程式有在動
print("✅ 程式已啟動！正在準備生成...")

# 取得目前腳本所在的資料夾路徑 (避免找不到檔案)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 設定檔案路徑
DATA_FILE = os.path.join(BASE_DIR, 'data.json')
TEMPLATE_FILE = os.path.join(BASE_DIR, 'template.html')
OUTPUT_DIR = os.path.join(BASE_DIR, 'docs')

def build():
    # 檢查 data.json 是否存在
    if not os.path.exists(DATA_FILE):
        print(f"❌ 錯誤：找不到 data.json")
        print(f"   請確認檔案位於：{DATA_FILE}")
        return

    # 讀取資料
    print(f"📂 正在讀取資料: {DATA_FILE}")
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            users = json.load(f)
    except Exception as e:
        print(f"❌ data.json 讀取失敗: {e}")
        return

    # 讀取模板
    try:
        with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
            template_html = f.read()
    except Exception as e:
        print(f"❌ template.html 讀取失敗: {e}")
        return

    # 清理並建立 docs 資料夾
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        print(f"📁 建立輸出目錄: {OUTPUT_DIR}")

    # 開始生成
    print(f"🚀 開始為 {len(users)} 位使用者製作卡片...")
    
    count = 0
    for user in users:
        user_id = user['id'].strip()
        user_name = user.get('name', 'Friend')
        user_title = user.get('title', 'Merry Christmas')
        user_msg = user.get('message', '')

        # 建立個人資料夾
        user_dir = os.path.join(OUTPUT_DIR, user_id)
        os.makedirs(user_dir, exist_ok=True)
        
        # 替換內容
        final_content = template_html \
            .replace('{{NAME}}', user_name) \
            .replace('{{TITLE}}', user_title) \
            .replace('{{CONTENT}}', user_msg)
        
        # 存檔
        with open(os.path.join(user_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(final_content)
        count += 1

    print("-" * 30)
    print(f"🎉 成功生成 {count} 個網頁！")
    print(f"👉 請開啟資料夾查看：{OUTPUT_DIR}")

# --- 程式進入點 ---
if __name__ == "__main__":
    # 這裡呼叫主程式
    build() 