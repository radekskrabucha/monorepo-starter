/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as appLayoutImport } from './routes/(app)/_layout'
import { Route as appLayoutIndexImport } from './routes/(app)/_layout/index'

// Create Virtual Routes

const appImport = createFileRoute('/(app)')()

// Create/Update Routes

const appRoute = appImport.update({
  id: '/(app)',
  getParentRoute: () => rootRoute,
} as any)

const appLayoutRoute = appLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => appRoute,
} as any)

const appLayoutIndexRoute = appLayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => appLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(app)': {
      id: '/(app)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_layout': {
      id: '/(app)/_layout'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appLayoutImport
      parentRoute: typeof appRoute
    }
    '/(app)/_layout/': {
      id: '/(app)/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appLayoutIndexImport
      parentRoute: typeof appLayoutImport
    }
  }
}

// Create and export the route tree

interface appLayoutRouteChildren {
  appLayoutIndexRoute: typeof appLayoutIndexRoute
}

const appLayoutRouteChildren: appLayoutRouteChildren = {
  appLayoutIndexRoute: appLayoutIndexRoute,
}

const appLayoutRouteWithChildren = appLayoutRoute._addFileChildren(
  appLayoutRouteChildren,
)

interface appRouteChildren {
  appLayoutRoute: typeof appLayoutRouteWithChildren
}

const appRouteChildren: appRouteChildren = {
  appLayoutRoute: appLayoutRouteWithChildren,
}

const appRouteWithChildren = appRoute._addFileChildren(appRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof appLayoutIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof appLayoutIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/(app)': typeof appRouteWithChildren
  '/(app)/_layout': typeof appLayoutRouteWithChildren
  '/(app)/_layout/': typeof appLayoutIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/'
  id: '__root__' | '/(app)' | '/(app)/_layout' | '/(app)/_layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  appRoute: typeof appRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  appRoute: appRouteWithChildren,
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
        "/(app)"
      ]
    },
    "/(app)": {
      "filePath": "(app)",
      "children": [
        "/(app)/_layout"
      ]
    },
    "/(app)/_layout": {
      "filePath": "(app)/_layout.tsx",
      "parent": "/(app)",
      "children": [
        "/(app)/_layout/"
      ]
    },
    "/(app)/_layout/": {
      "filePath": "(app)/_layout/index.tsx",
      "parent": "/(app)/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
