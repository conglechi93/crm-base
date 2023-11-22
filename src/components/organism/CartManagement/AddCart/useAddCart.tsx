import { FormInstance } from 'antd'

const useAddCart = (form: FormInstance) => {
  const items = [
    {
      title: 'Thông tin',
      description: '',
    },
    {
      title: 'Hình ảnh',
      description: '',
    },
    {
      title: 'Mô tả',
      description: '',
    },
  ]

  return {
    items,
  }
}

export default useAddCart
