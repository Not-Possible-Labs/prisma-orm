/*
  Warnings:

  - Added the required column `startedAt` to the `game_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game_history" ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL;
