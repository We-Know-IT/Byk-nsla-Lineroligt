

export default function SidebarLogo({imageSrc = "/example-images/Bykänsla_logo.png", width = 80, height = 80}: {imageSrc?: string, width?: number, height?: number}) {
  return (
    <div className="flex w-full items-center justify-center gap-2 px-4 py-6 md:py-4">
        <img
            src={imageSrc}
            alt="Logo"
            width={width}
            height={height}
        />
    </div>
  );
}
