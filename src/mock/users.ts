import { AuthUser, UserPassLogin } from "../features/auth/auth.model";
import { UserDetails } from "../features/user/user.model";
import { UserPayment } from "../features/payment/payment.model";
// this file is chagne by using database
export const MOCK_USERS: (UserPassLogin & AuthUser)[] = [
  {
    username: "admin",
    password: "admin",
    email: "admin@gmail.com",
    id: "qwcc269f-ff7f-4f39-916c-f07d5248fbwe",
    firstName: "Son",
    lastName: "Tran Xuan",
  },
  {
    username: "sontx1",
    password: "sontx1",
    email: "sontx1@gmail.com",
    id: "efcc269f-ff7f-4f39-916c-f07d5248fb42",
    firstName: "Son 1",
    lastName: "Tran Xuan",
  },
  {
    username: "sontx2",
    password: "sontx2",
    email: "sontx2@gmail.com",
    id: "760c30e3-638c-423d-8ce5-4761c708d000",
    firstName: "Son 2",
    lastName: "Tran Xuan",
  },
  {
    username: "sontx3",
    password: "sontx3",
    email: "sontx3@gmail.com",
    id: "e9cfe448-f93b-49a2-8438-96abe10747f5",
    firstName: "Son 3",
    lastName: "Tran Xuan",
  },
];

const USER_DETAILS_SAMPLE: UserDetails = {
  id: "",
  addresses: [
    {
      id: "1",
      name: "Tran Xuan Son",
      country: "Vietnam",
      city: "Da Nang",
      phone: "1234567688",
      phonePrefix: "+84",
      address: "147 To Hieu, Lien Chieu",
      latitude: 1,
      longitude: 1,
      type: "home",
    },
    {
      id: "2",
      name: "Tran Xuan Son",
      country: "United States",
      city: "Abbeville",
      phone: "456534535",
      phonePrefix: "+84",
      address: "Somewhere in US",
      latitude: 1,
      longitude: 1,
      type: "work",
    },
    {
      id: "3",
      name: "Tran Xuan Son",
      country: "United States",
      city: "Abernathy",
      phone: "2342342343",
      phonePrefix: "+84",
      address: "Somewhere in US",
      latitude: 1,
      longitude: 1,
      type: "work",
    },
  ],
  defaultAddressId: "1",
};

export const MOCK_USER_DETAILS: UserDetails[] = MOCK_USERS.map((user) => ({
  ...USER_DETAILS_SAMPLE,
  id: user.id,
}));

const USER_PAYMENT_SAMPLE: UserPayment = {
  id: "",
  lastUsed: "credit",
  methods: [
    {
      type: "cod",
    },
    {
      type: "credit",
      cards: [
        {
          id: "1",
          number: "12345676744",
          exp: "22/22",
          cvv: "123",
          ownerName: "Tran Xuan Son",
        },
        {
          id: "2",
          number: "3423423234",
          exp: "22/24",
          cvv: "432",
          ownerName: "Tran Xuan Soan",
        },
      ],
    },
  ],
};
export const MOCK_USER_PAYMENT: UserPayment[] = MOCK_USERS.map((user) => ({
  ...USER_PAYMENT_SAMPLE,
  id: user.id,
}));
