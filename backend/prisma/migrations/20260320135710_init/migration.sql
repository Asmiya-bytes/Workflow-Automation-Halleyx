/*
  Warnings:

  - You are about to drop the column `metadata` on the `Step` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Step" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "workflow_id" TEXT NOT NULL,
    "step_type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Step_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "Workflow" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Step" ("created_at", "id", "name", "order", "step_type", "updated_at", "workflow_id") SELECT "created_at", "id", "name", "order", "step_type", "updated_at", "workflow_id" FROM "Step";
DROP TABLE "Step";
ALTER TABLE "new_Step" RENAME TO "Step";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
