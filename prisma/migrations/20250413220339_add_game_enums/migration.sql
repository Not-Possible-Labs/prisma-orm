/*
  Warnings:

  - Changed the type of `gameType` on the `game_history` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `result` on the `game_history` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('STANDARD', 'CHESS960');

-- CreateEnum
CREATE TYPE "GameResult" AS ENUM ('WIN', 'LOSS', 'DRAW');

-- AlterTable
ALTER TABLE "game_history" DROP COLUMN "gameType",
ADD COLUMN     "gameType" "GameType" NOT NULL,
DROP COLUMN "result",
ADD COLUMN     "result" "GameResult" NOT NULL;
