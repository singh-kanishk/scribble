import { createFileRoute } from '@tanstack/react-router'
import { SignUpForm } from '@/components/form/signup-form'
export const Route = createFileRoute('/signup')({
  component: Comp,
})

function Comp() {
  return <SignUpForm/>
}