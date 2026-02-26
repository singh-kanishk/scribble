import { createFileRoute } from '@tanstack/react-router'
import { LogInForm } from '@/components/form/login-form'
export const Route = createFileRoute('/login')({
  component: Comp,
})

function Comp() {
  return (
    <LogInForm></LogInForm>
  )
}