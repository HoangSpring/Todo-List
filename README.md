# 📝 Ứng Dụng Todo List

## Mô Tả Dự Án

Ứng dụng Todo List là một ứng dụng web đơn giản, được xây dựng bằng React, cho phép người dùng:
- Tạo, hoàn thành, và xóa các công việc hàng ngày
- Lọc công việc theo trạng thái (Tất Cả, Chưa Hoàn Thành, Đã Hoàn Thành)
- Tìm kiếm công việc bằng từ khóa
- Xem thống kê số lượng công việc
- Lưu dữ liệu tự động vào trình duyệt (localStorage)

**Mục Tiêu:** Thực hành phát triển frontend hỗ trợ AI, áp dụng React Hooks, quản lý state, khả năng truy cập, và thiết kế responsive.

---

## Hướng Dẫn Cài Đặt

### Yêu Cầu Hệ Thống
- Node.js 14+ và npm
- Trình soạn thảo mã (VS Code, WebStorm, v.v.)
- Trình duyệt hiện đại (Chrome, Firefox, Safari, Edge)

### Các Bước Cài Đặt

1. **Tạo ứng dụng React mới:**
   ```bash
   npx create-react-app todo-app
   cd todo-app
   ```

2. **Cài đặt thư viện cần thiết:**
   ```bash
   npm install prop-types
   ```

3. **Sao chép các file:**
   - Đã tách các component vào thư mục `src/components/`
   - Thay thế `src/App.jsx` và `src/App.css`

4. **Chạy ứng dụng:**
   ```bash
   npm start
   ```
   Ứng dụng sẽ mở ở `http://localhost:3000`

---

## Cấu Trúc Dự Án

```
todo-app/
├── src/
│   ├── components/
│   │   ├── FilterBar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Stats.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoList.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── README.md
└── CHECKLIST.md
```

## Các Vấn Đề Gặp Phải & Cách Giải Quyết

### Vấn Đề 1: Component App quá lớn, khó bảo trì
**Nguyên Nhân:** Ban đầu, toàn bộ các chức năng (thêm, xóa, tìm kiếm, lọc, hiển thị danh sách, item) đều được gom chung trong 1 file `App_Template.jsx`.
**Giải Pháp:** Tách nhỏ thành các component riêng biệt (TodoList, TodoItem, FilterBar, Stats, SearchBar) vào thư mục `src/components/`, giúp code clean, module hóa và dễ quản lý hơn, đồng thời dùng Props để truyền dữ liệu và event handler giữa chúng.

### Vấn Đề 2: Tìm kiếm và bộ lọc inline
**Nguyên Nhân:** Phần thanh tìm kiếm ban đầu được render inline ngay trong `App`.
**Giải Pháp:** Extract khối HTML của phần tìm kiếm ra một file riêng `SearchBar.jsx` để thống nhất với cách cấu trúc các component khác.

## Mở Rộng & Cải Tiến Trong Tương Lai

Các tính năng có thể thêm vào:
- [ ] Dark mode toggle
- [ ] Due dates / Priority levels
- [ ] Categories/Tags

## Ghi Chú Của Tác Giả

Đã hoàn thành refactor toàn bộ monolithic app thành modular component architecture. Các tính năng kiểm tra tự động và manual review cho ARIA và Accessibility sẽ cần thực hiện thủ công như trong checklist.
