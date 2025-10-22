# 🖼️ AI Image Renaming System

Hệ thống tự động đổi tên ảnh AI-generated trong thư mục `data_img` từ 1 đến hết ảnh.

## 🚀 Tính năng

- ✅ **Tự động đổi tên**: Đổi tên tất cả ảnh thành định dạng `ai-face-001.jpg`, `ai-face-002.jpg`, etc.
- ✅ **Backup tự động**: Tự động tạo backup trước khi đổi tên
- ✅ **Khôi phục**: Có thể khôi phục tên gốc từ backup
- ✅ **Thống kê**: Hiển thị thống kê bộ sưu tập ảnh
- ✅ **Dry-run**: Xem trước những gì sẽ được đổi tên
- ✅ **Đa nền tảng**: Hỗ trợ Windows, macOS, Linux

## 📁 Cấu trúc thư mục

```
scripts/
├── rename_images.py          # Script Python chính
├── rename-images.js          # Script Node.js
├── rename-images.bat        # Script Windows batch
└── README.md                # Hướng dẫn này
```

## 🛠️ Cách sử dụng

### 1. Sử dụng Python (Khuyến nghị)

```bash
# Đổi tên tất cả ảnh thành ai-face-001, ai-face-002, etc.
python scripts/rename_images.py rename

# Xem trước những gì sẽ được đổi tên (không thực sự đổi tên)
python scripts/rename_images.py rename --dry-run

# Khôi phục tên gốc từ backup
python scripts/rename_images.py restore

# Liệt kê tất cả ảnh hiện tại
python scripts/rename_images.py list

# Hiển thị thống kê bộ sưu tập ảnh
python scripts/rename_images.py stats

# Tùy chỉnh prefix và số bắt đầu
python scripts/rename_images.py rename --prefix my-faces --start 100
```

### 2. Sử dụng Windows Batch

```cmd
# Đổi tên ảnh
scripts\rename-images.bat rename

# Khôi phục từ backup
scripts\rename-images.bat restore

# Liệt kê ảnh
scripts\rename-images.bat list

# Thống kê
scripts\rename-images.bat stats
```

### 3. Sử dụng Node.js

```bash
# Đổi tên ảnh
node scripts/rename-images.js rename

# Khôi phục từ backup
node scripts/rename-images.js restore

# Liệt kê ảnh
node scripts/rename-images.js list
```

## 📊 Định dạng tên mới

### Trước khi đổi tên:
```
data_img/
├── download.jpg
├── download (1).jpg
├── generated-face-1-1761098014200.jpg
├── generated-face-2-1761098018694.jpg
└── ...
```

### Sau khi đổi tên:
```
data_img/
├── ai-face-001.jpg
├── ai-face-002.jpg
├── ai-face-003.jpg
├── ai-face-004.jpg
└── ...
```

## 🔧 Tùy chỉnh

### Thay đổi prefix:
```bash
python scripts/rename_images.py rename --prefix student-face
# Kết quả: student-face-001.jpg, student-face-002.jpg, etc.
```

### Thay đổi số bắt đầu:
```bash
python scripts/rename_images.py rename --start 100
# Kết quả: ai-face-100.jpg, ai-face-101.jpg, etc.
```

### Xem trước (dry-run):
```bash
python scripts/rename_images.py rename --dry-run
# Hiển thị những gì sẽ được đổi tên mà không thực sự đổi tên
```

## 🛡️ An toàn

- ✅ **Backup tự động**: Tất cả ảnh gốc được backup vào `data_img_backup/`
- ✅ **Mapping file**: Lưu trữ mapping tên cũ → tên mới trong `rename-mapping.json`
- ✅ **Khôi phục**: Có thể khôi phục tên gốc bất kỳ lúc nào
- ✅ **Validation**: Kiểm tra file tồn tại trước khi đổi tên

## 📈 Thống kê

```bash
python scripts/rename_images.py stats
```

Hiển thị:
- Tổng số ảnh
- Tổng dung lượng
- Dung lượng trung bình
- Phân loại theo định dạng file

## 🔄 Khôi phục

Nếu muốn khôi phục tên gốc:

```bash
python scripts/rename_images.py restore
```

Hoặc:

```cmd
scripts\rename-images.bat restore
```

## ⚠️ Lưu ý

1. **Backup quan trọng**: Luôn có backup trước khi đổi tên
2. **Kiểm tra kết quả**: Sử dụng `--dry-run` để xem trước
3. **Không đổi tên nhiều lần**: Tránh đổi tên nhiều lần liên tiếp
4. **Kiểm tra ứng dụng**: Đảm bảo ứng dụng vẫn hoạt động sau khi đổi tên

## 🎯 Tích hợp với ứng dụng

Sau khi đổi tên, ứng dụng sẽ tự động phát hiện và sử dụng hệ thống đặt tên mới:

- `ai-face-001.jpg` → `ai-face-002.jpg` → `ai-face-003.jpg` → ...
- Hỗ trợ nhiều định dạng: `.jpg`, `.png`, `.webp`, `.gif`, `.svg`
- Tối ưu hiệu suất với hệ thống cache thông minh

## 🆘 Xử lý sự cố

### Lỗi "No backup found":
```bash
# Kiểm tra thư mục backup
ls data_img_backup/
```

### Lỗi "Permission denied":
```bash
# Chạy với quyền admin (Windows)
# Hoặc sử dụng sudo (Linux/macOS)
sudo python scripts/rename_images.py rename
```

### Lỗi "File not found":
```bash
# Kiểm tra đường dẫn
pwd
ls data_img/
```

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. Python/Node.js đã được cài đặt
2. Quyền truy cập thư mục
3. File backup có tồn tại
4. Logs trong console
