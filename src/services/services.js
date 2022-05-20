// eslint-disable-next-line class-methods-use-this
import { useState } from "react";

export async function guestSession() {
  // eslint-disable-next-line no-return-await
  const res = await fetch("https://aviasales-test-api.kata.academy/search");
  if (!res.ok) {
    return guestSession();
  }
  // eslint-disable-next-line no-return-await
  return await res.json();
}

export async function getTickets(searchId) {
  // eslint-disable-next-line no-return-await
  const res = await fetch(
    `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
  );
  if (!res.ok) {
    return getTickets(searchId);
  }
  // eslint-disable-next-line no-return-await
  return await res.json();
}
