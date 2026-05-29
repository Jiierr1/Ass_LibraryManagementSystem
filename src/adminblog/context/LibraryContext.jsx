// context/LibraryContext.js
import React, { createContext, useReducer, useContext, useEffect } from "react";

const LibraryContext = createContext();

const STORAGE_KEY = "library_management_data";

const getInitialData = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);

  const today = new Date();
  const getDateStr = (daysOffset = 0) => {
    const d = new Date();
    d.setDate(today.getDate() + daysOffset);
    return d.toISOString().split("T")[0];
  };

  return {
    users: [
      {
        id: 1,
        name: "Admin User",
        email: "admin@library.com",
        role: "librarian",
        phone: "1234567890",
        createdAt: getDateStr(-5),
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        role: "librarian",
        phone: "5551234567",
        createdAt: getDateStr(-10),
      },
      {
        id: 3,
        name: "Michael Chen",
        email: "michael.c@example.com",
        role: "member",
        phone: "5559876543",
        createdAt: getDateStr(-20),
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily.d@example.com",
        role: "member",
        phone: "5554567890",
        createdAt: getDateStr(-15),
      },
      {
        id: 5,
        name: "David Wilson",
        email: "david.w@example.com",
        role: "member",
        phone: "5551112222",
        createdAt: getDateStr(-8),
      },
    ],
    categories: [
      { id: 1, name: "Fiction" },
      { id: 2, name: "Non-Fiction" },
      { id: 3, name: "Science" },
      { id: 4, name: "History" },
      { id: 5, name: "Technology" },
    ],
    books: [
      {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        isbn: "9780525559474",
        categoryId: 1,
        publishedYear: 2020,
      },
      {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        isbn: "9780735211292",
        categoryId: 2,
        publishedYear: 2018,
      },
      {
        id: 3,
        title: "Brief Answers to Big Questions",
        author: "Stephen Hawking",
        isbn: "9781984819192",
        categoryId: 3,
        publishedYear: 2018,
      },
      {
        id: 4,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        isbn: "9780062316097",
        categoryId: 4,
        publishedYear: 2011,
      },
      {
        id: 5,
        title: "Clean Code",
        author: "Robert Martin",
        isbn: "9780132350884",
        categoryId: 5,
        publishedYear: 2008,
      },
    ],
    loans: [
      {
        id: 1,
        bookId: 1,
        memberId: 3,
        borrowDate: getDateStr(-5),
        dueDate: getDateStr(9),
        returnDate: null,
        fine: null,
      },
      {
        id: 2,
        bookId: 2,
        memberId: 4,
        borrowDate: getDateStr(-12),
        dueDate: getDateStr(2),
        returnDate: null,
        fine: null,
      },
      {
        id: 3,
        bookId: 4,
        memberId: 5,
        borrowDate: getDateStr(-20),
        dueDate: getDateStr(-6),
        returnDate: getDateStr(-3),
        fine: 2.5,
      },
      {
        id: 4,
        bookId: 3,
        memberId: 3,
        borrowDate: getDateStr(-2),
        dueDate: getDateStr(12),
        returnDate: null,
        fine: null,
      },
    ],
    settings: {
      maxLoanDays: 14,
      finePerDay: 0.5,
    },
  };
};

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "SET_DATA":
      newState = { ...state, ...action.payload };
      break;
    case "ADD_USER":
      newState = {
        ...state,
        users: [...state.users, { ...action.payload, id: Date.now() }],
      };
      break;
    case "UPDATE_USER":
      newState = {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u,
        ),
      };
      break;
    case "DELETE_USER":
      newState = {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };
      break;
    case "ADD_BOOK":
      newState = {
        ...state,
        books: [...state.books, { ...action.payload, id: Date.now() }],
      };
      break;
    case "UPDATE_BOOK":
      newState = {
        ...state,
        books: state.books.map((b) =>
          b.id === action.payload.id ? action.payload : b,
        ),
      };
      break;
    case "DELETE_BOOK":
      newState = {
        ...state,
        books: state.books.filter((b) => b.id !== action.payload),
      };
      break;
    case "ADD_CATEGORY":
      newState = {
        ...state,
        categories: [
          ...state.categories,
          { ...action.payload, id: Date.now() },
        ],
      };
      break;
    case "UPDATE_CATEGORY":
      newState = {
        ...state,
        categories: state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c,
        ),
      };
      break;
    case "DELETE_CATEGORY":
      newState = {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
      };
      break;
    case "ADD_LOAN":
      newState = {
        ...state,
        loans: [
          ...state.loans,
          { ...action.payload, id: Date.now(), fine: null },
        ],
      };
      break;
    case "RETURN_LOAN":
      newState = {
        ...state,
        loans: state.loans.map((l) =>
          l.id === action.payload.id
            ? {
                ...l,
                returnDate: action.payload.returnDate,
                fine: action.payload.fine,
              }
            : l,
        ),
      };
      break;
    case "UPDATE_SETTINGS":
      newState = {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
      break;
    default:
      newState = state;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  return newState;
};

export const LibraryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialData());

  return (
    <LibraryContext.Provider value={{ state, dispatch }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context)
    throw new Error("useLibrary must be used within LibraryProvider");
  return context;
};
