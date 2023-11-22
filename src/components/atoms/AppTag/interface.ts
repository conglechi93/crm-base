export type TagProps = {
  variant:
  | 'empty' // trống
  | 'pending' // chờ duyệt
  | 'publish' // đang hoạt động
  | 'suspend' // tạm ngưng
  | 'locked' // đã khóa
children?: React.ReactNode
style?: object
  // children: React.ReactNode
}
