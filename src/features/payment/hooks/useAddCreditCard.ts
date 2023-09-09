import { useSimpleMutation } from "../../../hooks/api-query/useSimpleMutation";
import { MOCK_USER_PAYMENT } from "../../../mock/users";
import { useQueryClient } from "@tanstack/react-query";
import { CreditCard, CreditPaymentMethod, UserPayment } from "../payment.model";
import { useUser } from "../../../hooks/useUser";
import { v4 as uuidv4 } from "uuid";

async function addCreditCard(userId: string, data: CreditCard) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = MOCK_USER_PAYMENT.find((payment) => payment.id === userId);
      if (match) {
        const credit = match.methods.find((method) => method.type === "credit") as CreditPaymentMethod;
        if (credit) {
          const newCard: CreditCard = {
            ...data,
            id: uuidv4(),
          };
          credit.cards.push(newCard);
          resolve(newCard);
        } else {
          reject();
        }
      } else {
        reject();
      }
    }, 1000 + Math.random() * 1000);
  });
}

export function useAddCreditCard() {
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  return useSimpleMutation(["userPayment"], (data) => addCreditCard(user.id, data), {
    onSuccess: async (data) => {
      if (data) {
        await queryClient.cancelQueries(["userPayment"]);
        const previousData = queryClient.getQueryData<UserPayment>(["userPayment"]);
        if (previousData) {
          const newUserPayment: UserPayment = {
            ...previousData,
            methods: previousData.methods.map((method) => {
              if (method.type === "credit") {
                method.cards.push(data);
              }
              return method;
            }),
          };
          queryClient.setQueryData(["userPayment"], newUserPayment);
        }
      }
    },
  });
}
