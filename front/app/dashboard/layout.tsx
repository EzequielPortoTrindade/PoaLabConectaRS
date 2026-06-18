import { ThemeProvider } from "@/components/theme-provider"
import { DashboardLayout } from "@/components/layout"
import { QueryProvider } from "@/components/query-provider"

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </QueryProvider>
    </ThemeProvider>
  )
}
