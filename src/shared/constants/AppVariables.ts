export enum AttachmentType {
  THUMBNAIL_IMG = '1', // Ảnh đại diện giỏ hàng
  DIAGRAM_IMG = '2', // Sơ đồ mặt bằng
  CART_IMG = '3', // Giỏ hàng
  AVATAR_IMG = '4', // Ảnh đại diện shop
  COVER_IMG = '5', // Ảnh cover shop
  INVERTORY_IMG = '6', // Ảnh mặt hàng
}
export const cartModalInfo = {
  add: {
    draftString: 'addCartData',
    type: 'add',
  },
  edit: {
    draftString: 'editCartData',
    type: 'edit',
  },
  view: {
    draftString: 'viewCartData',
    type: 'view',
  },
};

export const modalInfo = {
  inventory: {
    add: {
      draftString: 'addInventoryData',
      type: 'add',
    },
    edit: {
      draftString: 'editInventoryData',
      type: 'edit',
    },
    view: {
      draftString: 'viewInventoryData',
      type: 'view',
    },
    import: {
      draftString: 'importInventoryData',
      type: 'import',
    },
  },
};
