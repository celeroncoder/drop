import { getFiles } from "@/service/file";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function ImageGrid() {
  const { userId } = await auth();
  if (!userId) return null;

  const files = await getFiles({ authId: userId });
  if (!files) return <div>no files upload some!</div>;

  return (
    <div className="flex items-center justify-center flex-col">
      <p className="text-xl mb-2">Uploaded Images...</p>
      <div className="grid grid-cols-3 gap-4 p-10 border-t">
        {files.map((file) => (
          <div
            key={file.id}
            className="relative p-2 rounded-lg border shadow-sm hover:scale-110 hover:shadow-lg duration-200 space-y-2"
          >
            <Image
              src={`https://utfs.io/a/${process.env.UPLOADTHING_APP_ID}/${file.key}`}
              alt={file.url}
              width={150}
              height={150}
              typeof={file.type}
              className="rounded-lg aspect-square"
            />
            <div className="absolute bottom-4 right-4 space-x-2">
              <button className="hover:backdrop-sm bg-black/50 hover:bg-black/80 p-1 rounded text-red-50 hover:text-red-500 transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button className="hover:backdrop-sm bg-black/50 hover:bg-black/80 p-1 rounded text-gray-50 hover:text-gray-500 transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
