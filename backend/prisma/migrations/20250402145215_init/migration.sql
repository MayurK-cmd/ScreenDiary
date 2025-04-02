-- CreateEnum
CREATE TYPE "MovieStatus" AS ENUM ('WATCHED', 'WATCHING', 'WATCHLIST');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imdbId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "poster" TEXT,
    "status" "MovieStatus" NOT NULL,
    "rated" TEXT,
    "year" TEXT,
    "genre" TEXT,
    "actors" TEXT,
    "plot" TEXT,
    "country" TEXT,
    "imdbRating" TEXT,
    "rottenTomatoesRating" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movie_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_displayName_key" ON "users"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "movie_logs_userId_imdbId_key" ON "movie_logs"("userId", "imdbId");

-- AddForeignKey
ALTER TABLE "movie_logs" ADD CONSTRAINT "movie_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
