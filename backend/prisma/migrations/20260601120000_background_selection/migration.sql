-- CreateTable
CREATE TABLE "SiteBackground" (
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteBackground_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "SiteBackgroundSelection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "activeBackgroundKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteBackgroundSelection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SiteBackgroundSelection" ADD CONSTRAINT "SiteBackgroundSelection_activeBackgroundKey_fkey" FOREIGN KEY ("activeBackgroundKey") REFERENCES "SiteBackground"("key") ON DELETE RESTRICT ON UPDATE CASCADE;