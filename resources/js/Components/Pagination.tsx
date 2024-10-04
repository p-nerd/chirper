import type { TLink } from "@/types";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    DoubleArrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
} from "@radix-ui/react-icons";

const Pagination = ({
    to,
    from,
    total,
    links,
    perPage,
    onPageLinkClick,
    onChangePerPage,
}: {
    to: number;
    from: number;
    total: number;
    links: TLink[];
    perPage: number;
    onPageLinkClick: (link: string) => void;
    onChangePerPage: (perPage: number) => void;
}) => {
    const firstLink = links[1];
    const lastLink = links[links.length - 2];

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {from} to {to} of {total} items.
            </div>
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => onPageLinkClick(firstLink.url)}
                        disabled={firstLink.active}
                    >
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    {links.map((link, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => onPageLinkClick(link.url)}
                            disabled={!link.url || link.active}
                        >
                            {index === 0 ? (
                                <ChevronLeftIcon className="h-4 w-4" />
                            ) : index === links.length - 1 ? (
                                <ChevronRightIcon className="h-4 w-4" />
                            ) : (
                                link.label
                            )}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => onPageLinkClick(lastLink.url)}
                        disabled={lastLink.active}
                    >
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center space-x-2">
                    <Select value={`${perPage}`} onValueChange={v => onChangePerPage(Number(v))}>
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={perPage} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 15, 20, 30, 40, 50, 100, 200, 300, 500, 900].map(pageSize => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
