export default function CartReducer(state, action) {
  if (action.type == "ADD_ITEM") {
    const index = state.items.findIndex((item) => item.id === action.item.id);

    const updatedItems = [...state.items];
    if (index > -1) {
      const existingItem = state.items[index];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[index] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }
}
