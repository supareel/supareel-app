import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type FeedPostProps = {
  email?: string;
  name?: string | null;
  avatar?: string;
};

function FeedPost({ email, name, avatar }: FeedPostProps) {
  return (
    <div>
      <div className="flex items-start px-5 py-2 m-0 gap-2 rounded-lg">
        <Avatar className="h-9 w-9 rounded-lg top-0 mt-1">
          {avatar?.startsWith("http") ? (
            <AvatarImage src={avatar} alt={email ?? "no-user-email"} />
          ) : (
            <AvatarFallback className="rounded-lg">
              {name?.charAt(0).toUpperCase() ?? "S"}
              {name?.charAt(-1).toUpperCase() ?? "U"}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col items-start text-left leading-tight">
          <div className="flex items-center justify-center gap-1">
            <p className="font-semibold" style={{ fontSize: "15px" }}>
              {name}
            </p>
            <span className="text-slate-400">·</span>
            <span className="text-slate-400 text-sm">Feb, 5</span>
          </div>
          <p className="mt-0.5 mb-3" style={{ fontSize: "15px" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ipsam
            nam quaerat culpa ipsum laborum reprehenderit natus beatae corrupti
            cupiditate cumque at, dolorum totam. Dignissimos quos corporis eius.
            Soluta, sit!
          </p>
        </div>
      </div>

      <hr />
    </div>
  );
}

export default FeedPost;
