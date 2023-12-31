"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { getAcronym } from "@/utils";
import {
	CircleDollarSign,
	CreditCard,
	FileSignature,
	HelpCircle,
	Home,
	LogOut,
	Menu,
	MessageCircle,
	Network,
	PlusSquare,
	Search,
	Settings,
	Share2,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { SideNavItem } from "../SideNav/SideNav";

const MobileNav = () => {
	const pathName = usePathname();
	const { data: session, status } = useSession();

	const shouldHighlight = (pathname: string) => {
		return pathname === pathName;
	};

	const handleLogout = () => {
		signOut();
	};

	return (
		<div className="w-full h-16 bg-gray-900 flex items-center justify-between p-6 sticky -bottom-[1px] z-50 lg:hidden">
			<Link href={"/"}>
				<Home color={shouldHighlight("/") ? "#b759d9" : "#FFF"} />
			</Link>
			<Link href={"/search"}>
				<Search color={shouldHighlight("/search") ? "#b759d9" : "#FFF"} />
			</Link>
			<Link href={"/"}>
				<PlusSquare
					color={shouldHighlight("/create-post") ? "#b759d9" : "#FFF"}
				/>
			</Link>
			<Link href={"/"}>
				<MessageCircle
					className="transition-all"
					color={shouldHighlight("/chats") ? "#b759d9" : "#FFF"}
				/>
			</Link>
			<Sheet>
				<SheetTrigger>
					<Menu color="#FFF" />
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle className="flex items-center justify-start">
							<Avatar className="mr-2 w-9 h-9">
								<AvatarImage src={session?.user.profilePhotoPresignedGet} />
								<AvatarFallback>
									{getAcronym(session?.user.presentationName || "")}
								</AvatarFallback>
							</Avatar>
							<div className="text-sm text-left">
								{session?.user.presentationName}
							</div>
						</SheetTitle>
					</SheetHeader>
					<div className="flex flex-col justify-between h-full pb-4 pt-4">
						<div className="mt-2 flex flex-col">
							<SheetClose asChild>
								<Link href={"/subscriptions"}>
									<MobileNavItem name="Inscrições" icon={<FileSignature />} />
								</Link>
							</SheetClose>

							<SheetClose asChild>
								<Link href={"/cards"}>
									<MobileNavItem
										name="Cartões"
										icon={<CreditCard />}
									/>
								</Link>
							</SheetClose>

							<SheetClose asChild>
								<Link href={"/affiliates"}>
									<MobileNavItem name="Afiliados" icon={<Network />} />
								</Link>
							</SheetClose>

							<SheetClose asChild>
								<Link href={"/dashboard"}>
									<MobileNavItem name="Dashboard" icon={<CircleDollarSign />} />
								</Link>
							</SheetClose>

							<SheetClose asChild>
								<Link href={"/settings"}>
									<MobileNavItem name="Configurações" icon={<Settings />} />
								</Link>
							</SheetClose>

							<SheetClose asChild>
								<Link
									target="_blank"
									href={
										"https://api.whatsapp.com/send?phone=556196286030&text=Gostaria%20de%20um%20aux%C3%ADlio%20na%20plataforma%2C%20poderia%20me%20ajudar%3F"
									}
								>
									<MobileNavItem name="Ajuda e Suporte" icon={<HelpCircle />} />
								</Link>
							</SheetClose>
						</div>
						<div className="mb-3" onClick={handleLogout}>
							<MobileNavItem name="Sair" icon={<LogOut />} />
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export interface MobileNavItemProps {
	name: string;
	icon: ReactElement;
}

const MobileNavItem = ({ icon, name }: MobileNavItemProps) => {
	return (
		<div className="flex items-center cursor-pointer mt-3 mb-3">
			{icon}
			<p className="ml-2 font-semibold text-base">{name}</p>
		</div>
	);
};

export default MobileNav;
