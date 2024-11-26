/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ReviewsImport } from './routes/reviews'
import { Route as AuthImport } from './routes/auth'
import { Route as AlbumsImport } from './routes/albums'
import { Route as IndexImport } from './routes/index'
import { Route as AlbumsIndexImport } from './routes/albums/index'
import { Route as AuthSignUpImport } from './routes/auth/sign-up'
import { Route as AuthSignInImport } from './routes/auth/sign-in'
import { Route as AlbumsSearchImport } from './routes/albums/search'
import { Route as AlbumsReviewsImport } from './routes/albums/reviews'
import { Route as AlbumsBookmarksImport } from './routes/albums/bookmarks'
import { Route as AlbumsAlbumIdIndexImport } from './routes/albums/$albumId/index'
import { Route as AlbumsAlbumIdEditImport } from './routes/albums/$albumId/edit'
import { Route as AlbumsAlbumIdReviewIndexImport } from './routes/albums/$albumId/review/index'
import { Route as AlbumsAlbumIdReviewReviewIdImport } from './routes/albums/$albumId/review/$reviewId'

// Create/Update Routes

const ReviewsRoute = ReviewsImport.update({
  id: '/reviews',
  path: '/reviews',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const AlbumsRoute = AlbumsImport.update({
  id: '/albums',
  path: '/albums',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AlbumsIndexRoute = AlbumsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AlbumsRoute,
} as any)

const AuthSignUpRoute = AuthSignUpImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => AuthRoute,
} as any)

const AuthSignInRoute = AuthSignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => AuthRoute,
} as any)

const AlbumsSearchRoute = AlbumsSearchImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => AlbumsRoute,
} as any)

const AlbumsReviewsRoute = AlbumsReviewsImport.update({
  id: '/reviews',
  path: '/reviews',
  getParentRoute: () => AlbumsRoute,
} as any)

const AlbumsBookmarksRoute = AlbumsBookmarksImport.update({
  id: '/bookmarks',
  path: '/bookmarks',
  getParentRoute: () => AlbumsRoute,
} as any)

const AlbumsAlbumIdIndexRoute = AlbumsAlbumIdIndexImport.update({
  id: '/$albumId/',
  path: '/$albumId/',
  getParentRoute: () => AlbumsRoute,
} as any)

const AlbumsAlbumIdEditRoute = AlbumsAlbumIdEditImport.update({
  id: '/$albumId/edit',
  path: '/$albumId/edit',
  getParentRoute: () => AlbumsRoute,
} as any)

const AlbumsAlbumIdReviewIndexRoute = AlbumsAlbumIdReviewIndexImport.update({
  id: '/$albumId/review/',
  path: '/$albumId/review/',
  getParentRoute: () => AlbumsRoute,
} as any)

const AlbumsAlbumIdReviewReviewIdRoute =
  AlbumsAlbumIdReviewReviewIdImport.update({
    id: '/$albumId/review/$reviewId',
    path: '/$albumId/review/$reviewId',
    getParentRoute: () => AlbumsRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/albums': {
      id: '/albums'
      path: '/albums'
      fullPath: '/albums'
      preLoaderRoute: typeof AlbumsImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/reviews': {
      id: '/reviews'
      path: '/reviews'
      fullPath: '/reviews'
      preLoaderRoute: typeof ReviewsImport
      parentRoute: typeof rootRoute
    }
    '/albums/bookmarks': {
      id: '/albums/bookmarks'
      path: '/bookmarks'
      fullPath: '/albums/bookmarks'
      preLoaderRoute: typeof AlbumsBookmarksImport
      parentRoute: typeof AlbumsImport
    }
    '/albums/reviews': {
      id: '/albums/reviews'
      path: '/reviews'
      fullPath: '/albums/reviews'
      preLoaderRoute: typeof AlbumsReviewsImport
      parentRoute: typeof AlbumsImport
    }
    '/albums/search': {
      id: '/albums/search'
      path: '/search'
      fullPath: '/albums/search'
      preLoaderRoute: typeof AlbumsSearchImport
      parentRoute: typeof AlbumsImport
    }
    '/auth/sign-in': {
      id: '/auth/sign-in'
      path: '/sign-in'
      fullPath: '/auth/sign-in'
      preLoaderRoute: typeof AuthSignInImport
      parentRoute: typeof AuthImport
    }
    '/auth/sign-up': {
      id: '/auth/sign-up'
      path: '/sign-up'
      fullPath: '/auth/sign-up'
      preLoaderRoute: typeof AuthSignUpImport
      parentRoute: typeof AuthImport
    }
    '/albums/': {
      id: '/albums/'
      path: '/'
      fullPath: '/albums/'
      preLoaderRoute: typeof AlbumsIndexImport
      parentRoute: typeof AlbumsImport
    }
    '/albums/$albumId/edit': {
      id: '/albums/$albumId/edit'
      path: '/$albumId/edit'
      fullPath: '/albums/$albumId/edit'
      preLoaderRoute: typeof AlbumsAlbumIdEditImport
      parentRoute: typeof AlbumsImport
    }
    '/albums/$albumId/': {
      id: '/albums/$albumId/'
      path: '/$albumId'
      fullPath: '/albums/$albumId'
      preLoaderRoute: typeof AlbumsAlbumIdIndexImport
      parentRoute: typeof AlbumsImport
    }
    '/albums/$albumId/review/$reviewId': {
      id: '/albums/$albumId/review/$reviewId'
      path: '/$albumId/review/$reviewId'
      fullPath: '/albums/$albumId/review/$reviewId'
      preLoaderRoute: typeof AlbumsAlbumIdReviewReviewIdImport
      parentRoute: typeof AlbumsImport
    }
    '/albums/$albumId/review/': {
      id: '/albums/$albumId/review/'
      path: '/$albumId/review'
      fullPath: '/albums/$albumId/review'
      preLoaderRoute: typeof AlbumsAlbumIdReviewIndexImport
      parentRoute: typeof AlbumsImport
    }
  }
}

// Create and export the route tree

interface AlbumsRouteChildren {
  AlbumsBookmarksRoute: typeof AlbumsBookmarksRoute
  AlbumsReviewsRoute: typeof AlbumsReviewsRoute
  AlbumsSearchRoute: typeof AlbumsSearchRoute
  AlbumsIndexRoute: typeof AlbumsIndexRoute
  AlbumsAlbumIdEditRoute: typeof AlbumsAlbumIdEditRoute
  AlbumsAlbumIdIndexRoute: typeof AlbumsAlbumIdIndexRoute
  AlbumsAlbumIdReviewReviewIdRoute: typeof AlbumsAlbumIdReviewReviewIdRoute
  AlbumsAlbumIdReviewIndexRoute: typeof AlbumsAlbumIdReviewIndexRoute
}

const AlbumsRouteChildren: AlbumsRouteChildren = {
  AlbumsBookmarksRoute: AlbumsBookmarksRoute,
  AlbumsReviewsRoute: AlbumsReviewsRoute,
  AlbumsSearchRoute: AlbumsSearchRoute,
  AlbumsIndexRoute: AlbumsIndexRoute,
  AlbumsAlbumIdEditRoute: AlbumsAlbumIdEditRoute,
  AlbumsAlbumIdIndexRoute: AlbumsAlbumIdIndexRoute,
  AlbumsAlbumIdReviewReviewIdRoute: AlbumsAlbumIdReviewReviewIdRoute,
  AlbumsAlbumIdReviewIndexRoute: AlbumsAlbumIdReviewIndexRoute,
}

const AlbumsRouteWithChildren =
  AlbumsRoute._addFileChildren(AlbumsRouteChildren)

interface AuthRouteChildren {
  AuthSignInRoute: typeof AuthSignInRoute
  AuthSignUpRoute: typeof AuthSignUpRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthSignInRoute: AuthSignInRoute,
  AuthSignUpRoute: AuthSignUpRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/albums': typeof AlbumsRouteWithChildren
  '/auth': typeof AuthRouteWithChildren
  '/reviews': typeof ReviewsRoute
  '/albums/bookmarks': typeof AlbumsBookmarksRoute
  '/albums/reviews': typeof AlbumsReviewsRoute
  '/albums/search': typeof AlbumsSearchRoute
  '/auth/sign-in': typeof AuthSignInRoute
  '/auth/sign-up': typeof AuthSignUpRoute
  '/albums/': typeof AlbumsIndexRoute
  '/albums/$albumId/edit': typeof AlbumsAlbumIdEditRoute
  '/albums/$albumId': typeof AlbumsAlbumIdIndexRoute
  '/albums/$albumId/review/$reviewId': typeof AlbumsAlbumIdReviewReviewIdRoute
  '/albums/$albumId/review': typeof AlbumsAlbumIdReviewIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth': typeof AuthRouteWithChildren
  '/reviews': typeof ReviewsRoute
  '/albums/bookmarks': typeof AlbumsBookmarksRoute
  '/albums/reviews': typeof AlbumsReviewsRoute
  '/albums/search': typeof AlbumsSearchRoute
  '/auth/sign-in': typeof AuthSignInRoute
  '/auth/sign-up': typeof AuthSignUpRoute
  '/albums': typeof AlbumsIndexRoute
  '/albums/$albumId/edit': typeof AlbumsAlbumIdEditRoute
  '/albums/$albumId': typeof AlbumsAlbumIdIndexRoute
  '/albums/$albumId/review/$reviewId': typeof AlbumsAlbumIdReviewReviewIdRoute
  '/albums/$albumId/review': typeof AlbumsAlbumIdReviewIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/albums': typeof AlbumsRouteWithChildren
  '/auth': typeof AuthRouteWithChildren
  '/reviews': typeof ReviewsRoute
  '/albums/bookmarks': typeof AlbumsBookmarksRoute
  '/albums/reviews': typeof AlbumsReviewsRoute
  '/albums/search': typeof AlbumsSearchRoute
  '/auth/sign-in': typeof AuthSignInRoute
  '/auth/sign-up': typeof AuthSignUpRoute
  '/albums/': typeof AlbumsIndexRoute
  '/albums/$albumId/edit': typeof AlbumsAlbumIdEditRoute
  '/albums/$albumId/': typeof AlbumsAlbumIdIndexRoute
  '/albums/$albumId/review/$reviewId': typeof AlbumsAlbumIdReviewReviewIdRoute
  '/albums/$albumId/review/': typeof AlbumsAlbumIdReviewIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/albums'
    | '/auth'
    | '/reviews'
    | '/albums/bookmarks'
    | '/albums/reviews'
    | '/albums/search'
    | '/auth/sign-in'
    | '/auth/sign-up'
    | '/albums/'
    | '/albums/$albumId/edit'
    | '/albums/$albumId'
    | '/albums/$albumId/review/$reviewId'
    | '/albums/$albumId/review'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth'
    | '/reviews'
    | '/albums/bookmarks'
    | '/albums/reviews'
    | '/albums/search'
    | '/auth/sign-in'
    | '/auth/sign-up'
    | '/albums'
    | '/albums/$albumId/edit'
    | '/albums/$albumId'
    | '/albums/$albumId/review/$reviewId'
    | '/albums/$albumId/review'
  id:
    | '__root__'
    | '/'
    | '/albums'
    | '/auth'
    | '/reviews'
    | '/albums/bookmarks'
    | '/albums/reviews'
    | '/albums/search'
    | '/auth/sign-in'
    | '/auth/sign-up'
    | '/albums/'
    | '/albums/$albumId/edit'
    | '/albums/$albumId/'
    | '/albums/$albumId/review/$reviewId'
    | '/albums/$albumId/review/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AlbumsRoute: typeof AlbumsRouteWithChildren
  AuthRoute: typeof AuthRouteWithChildren
  ReviewsRoute: typeof ReviewsRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AlbumsRoute: AlbumsRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
  ReviewsRoute: ReviewsRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/albums",
        "/auth",
        "/reviews"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/albums": {
      "filePath": "albums.tsx",
      "children": [
        "/albums/bookmarks",
        "/albums/reviews",
        "/albums/search",
        "/albums/",
        "/albums/$albumId/edit",
        "/albums/$albumId/",
        "/albums/$albumId/review/$reviewId",
        "/albums/$albumId/review/"
      ]
    },
    "/auth": {
      "filePath": "auth.tsx",
      "children": [
        "/auth/sign-in",
        "/auth/sign-up"
      ]
    },
    "/reviews": {
      "filePath": "reviews.tsx"
    },
    "/albums/bookmarks": {
      "filePath": "albums/bookmarks.tsx",
      "parent": "/albums"
    },
    "/albums/reviews": {
      "filePath": "albums/reviews.tsx",
      "parent": "/albums"
    },
    "/albums/search": {
      "filePath": "albums/search.tsx",
      "parent": "/albums"
    },
    "/auth/sign-in": {
      "filePath": "auth/sign-in.tsx",
      "parent": "/auth"
    },
    "/auth/sign-up": {
      "filePath": "auth/sign-up.tsx",
      "parent": "/auth"
    },
    "/albums/": {
      "filePath": "albums/index.tsx",
      "parent": "/albums"
    },
    "/albums/$albumId/edit": {
      "filePath": "albums/$albumId/edit.tsx",
      "parent": "/albums"
    },
    "/albums/$albumId/": {
      "filePath": "albums/$albumId/index.tsx",
      "parent": "/albums"
    },
    "/albums/$albumId/review/$reviewId": {
      "filePath": "albums/$albumId/review/$reviewId.tsx",
      "parent": "/albums"
    },
    "/albums/$albumId/review/": {
      "filePath": "albums/$albumId/review/index.tsx",
      "parent": "/albums"
    }
  }
}
ROUTE_MANIFEST_END */
