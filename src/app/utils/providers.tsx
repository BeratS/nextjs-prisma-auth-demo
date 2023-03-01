"use client"

import React, { ReactNode, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


interface Props {
  children?: ReactNode
}

export default function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient())
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
};
