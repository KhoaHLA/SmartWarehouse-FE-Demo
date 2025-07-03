# Quản lý kho TVL

Hệ thống quản lý kho TVL được xây dựng bằng Next.js 14 với TypeScript và Tailwind CSS.

## Tính năng

- Đăng ký xe nhập kho
- Quản lý thông tin cân tại cảng và kho
- Giao diện responsive với sidebar navigation
- Upload hình ảnh phiếu cân
- Tính toán tự động trọng lượng hàng
- **Tự động chuyển hướng sang trang đăng nhập nếu chưa đăng nhập**

## Luồng đăng nhập

- Khi truy cập website, nếu chưa đăng nhập, hệ thống sẽ tự động chuyển hướng sang trang `/login`.
- Sau khi đăng nhập thành công, bạn sẽ được truy cập các tính năng của hệ thống.
- Trạng thái đăng nhập được lưu trong `localStorage` với key `tvl_logged_in`.

## Cài đặt

1. Cài đặt dependencies:

```bash
npm install
```

2. Chạy development server:

```bash
npm run dev
```

3. Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

## Cấu trúc dự án

```
QuanLyKho/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page (tự động redirect nếu chưa đăng nhập)
│   └── dang-ky-xe/
│       └── page.tsx         # Vehicle registration page
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## Công nghệ sử dụng

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Font Awesome** - Icons

## Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run start` - Chạy production server
- `npm run lint` - Kiểm tra lỗi code
