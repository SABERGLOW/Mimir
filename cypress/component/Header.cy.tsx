import React from "react";
import Header from "../../components/Header"


import { render, screen } from "@testing-library/react"
import { SessionProvider } from 'next-auth/react'
import { data } from "cypress/types/jquery";
import { ThemeProvider } from "next-themes";


describe('Header.cy.ts', async() => {
  it('playground', async () => {

    cy.mount(
    <SessionProvider
        session={{
          expires: "1",
          user: { email: "a", name: "Delta", image: "c" },
        }}
      >

      <ThemeProvider attribute='class'>
        <Header/>
      </ThemeProvider>
    </SessionProvider>)

  })
})



export {}