const emojis = ["💖", "🔥", "😂", "🥲", "💀"]

const ReactionPicker = () => {
  return (
    <div className="absolute bottom-2 right-0 bg-primary rounded-full flex p-1 justify-between items-center drop-shadow-2xl w-fit gap-2 transition-all duration-300 scale-100 opacity-100">
      {emojis.map((emoji, i) => (
        <span
          key={i}
          className={`w-6 h-6 text-lg flex justify-center items-center text-center rounded-full cursor-pointer transition-transform hover:scale-125 hover:bg-primary-foreground/5
          opacity-0 animate-emojiIn`}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {emoji}
        </span>
      ))}
    </div>
  )
}
export default ReactionPicker