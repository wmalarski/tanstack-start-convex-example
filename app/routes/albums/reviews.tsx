import { useAuthToken } from '@convex-dev/auth/react'
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useConvexAuth } from 'convex/react'
import { AllReviewsList } from '~/components/reviews/review-lists/all-reviews-list'

const RouteComponent = () => {
  const { isLoading } = useConvexAuth()
  const token = useAuthToken()

  if (isLoading) {
    return null
  }

  if (!token) {
    return <Navigate to="/auth/sign-in" />
  }

  return <AllReviewsList />
}

export const Route = createFileRoute('/albums/reviews')({
  component: RouteComponent,
})
