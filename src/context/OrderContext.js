import { createContext, useMemo, useState } from "react";

const OrderContext = createContext();

export function OrderContextProvider(props) {
  // 주문데이터 저장 state
  const [orderCounts, setOrderCounts] = useState({
    // new Map(): 키-값 쌍을 효율적으로 저장하고 관리하는 데이터 구조
    // 상품 이름(키)과 주문 개수(값)을 저장.
    product: new Map(),
    // 상품 옵션(키)과 개수를 저장.
    options: new Map(),
  });

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, orderType) {
      const newOrderCounts = { ...orderCounts };

      const orderCountsMap = orderCounts[orderType];
      orderCountsMap.set(itemName, parseInt(newItemCount));

      setOrderCounts(newOrderCounts);
    }
    return [{ ...orderCounts }, updateItemCount];
  }, [orderCounts]);

  return <OrderContext.Provider value={value} {...props} />;
}
