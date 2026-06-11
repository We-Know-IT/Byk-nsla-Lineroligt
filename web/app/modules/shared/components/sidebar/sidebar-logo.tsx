

export default function SidebarLogo({imageSrc = "/example-images/Bykänsla_logo.png", width = 80, height = 80}: {imageSrc?: string, width?: number, height?: number}) {
  const logoHeight = height+40; // image height + padding (py-6)
    return (
    <div className={`flex w-full items-center justify-center gap-2 px-4 py-6 md:py-4 min-h-[${logoHeight}px] overflow-hidden`}>
        <img
            className="min-h-10 min-w-10 object-cover"
            src={imageSrc}
            alt="Logo"
            width={width}
            height={height}
        />
    </div>
  );
}
