import mysql.connector

try:
    print("🔄 Trying to connect...")

    conn = mysql.connector.connect(
        host="127.0.0.1",   # ✅ NOT localhost
        port=3306,
        user="root",
        password="atharva123",
        database="atharva",
        connection_timeout=5,
        use_pure=True       # 🔥 VERY IMPORTANT FIX
    )

    print("✅ MySQL Connected Successfully")

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM students_new")

    data = cursor.fetchall()
    print("📊 Data:", data)

    conn.close()

except Exception as e:
    print("❌ ERROR:", e)