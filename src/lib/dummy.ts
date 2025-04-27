export const messages = [
    {
      content: "Yo, finished up the project plan. Check the doc when you get a chance 📄",
      sender: {
        _id: "1a",
        name: "David Lee",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&auto=format&fit=crop",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      readBy: [
        { _id: "u2", name: "Anna Smith" },
        { _id: "u3", name: "Jack Harris" },
      ],
      attachments: [
        {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format",
          preview: "Project plan screenshot",
        },
      ],
      isEdited: false,
      reactions: [
        {
          emoji: "📄",
          users: [{ _id: "u2", name: "Anna Smith" }],
        },
      ],
    },
    {
      content: "This new UI design is 🔥. Go peep it 👀",
      sender: {
        _id: "u2",
        name: "Anna Smith",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&auto=format&fit=crop",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      readBy: [{ _id: "u1", name: "David Lee" }],
      attachments: [
        {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format",
          preview: "UI design mockup",
        },
      ],
      isEdited: true,
      reactions: [
        {
          emoji: "😍",
          users: [{ _id: "u1", name: "David Lee" }],
        },
      ],
    },
    {
      content: "Here's the final mockup for the homepage. Let me know if I missed anything 💬",
      sender: {
        _id: "1",
        name: "Emily Brown",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&auto=format&fit=crop",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      readBy: [{ _id: "u3", name: "Jack Harris" }],
      attachments: [
        {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format",
          preview: "Homepage design",
        },
      ],
      isEdited: false,
      reactions: [],
    },
    {
      content: "Yo, demo video of the new feature. It's lit 🔥",
      sender: {
        _id: "u3",
        name: "Jack Harris",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&auto=format&fit=crop",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      readBy: [
        { _id: "u1", name: "David Lee" },
        { _id: "u2", name: "Anna Smith" },
      ],
      attachments: [
        {
          type: "video" as const,
          url: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
          preview: "Feature demo",
        },
      ],
      isEdited: false,
      reactions: [
        {
          emoji: "🔥",
          users: [{ _id: "u1", name: "David Lee" }],
        },
      ],
    },
    {
      content: "Updated the user settings page! Give it a look and tell me if I missed anything 👌",
      sender: {
        _id: "1b",
        name: "Samantha Green",
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&h=200&auto=format&fit=crop",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      readBy: [{ _id: "u4", name: "Lucas White" }],
      attachments: [
        {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&auto=format",
          preview: "Settings page screenshot",
        },
      ],
      isEdited: true,
      reactions: [
        {
          emoji: "👌",
          users: [{ _id: "u4", name: "Lucas White" }],
        },
      ],
    },
    {
      content: "Check out this bug report. We gotta fix it ASAP ⚠️",
      sender: {
        _id: "u4",
        name: "Lucas White",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&auto=format&fit=crop",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      readBy: [{ _id: "u2", name: "Anna Smith" }],
      attachments: [],
      isEdited: false,
      reactions: [
        {
          emoji: "🧐",
          users: [{ _id: "u2", name: "Anna Smith" }],
        },
      ],
    },
    {
      content: "Quick demo of the onboarding process. Let me know what you think 💬",
      sender: {
        _id: "1c",
        name: "Kevin Scott",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&auto=format&fit=crop",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 50),
      readBy: [
        { _id: "u1", name: "David Lee" },
        { _id: "u3", name: "Jack Harris" },
      ],
      attachments: [
        {
          type: "video" as const,
          url: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-looking-at-a-notebook-3754-large.mp4",
          preview: "Onboarding demo",
        },
      ],
      isEdited: false,
      reactions: [
        {
          emoji: "👌",
          users: [{ _id: "u3", name: "Jack Harris" }],
        },
      ],
    },
    {
      content: "Let me know if the new design fits the brief. Ready for approval ✅",
      sender: {
        _id: "u5",
        name: "Rachel Kim",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&auto=format&fit=crop",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      readBy: [{ _id: "u1", name: "David Lee" }],
      attachments: [
        {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=600&auto=format",
          preview: "Design concept",
        },
      ],
      isEdited: false,
      reactions: [],
    },
    {
      content: "Yo, new logo version's up. It's in the shared folder 🎨",
      sender: {
        _id: "1d",
        name: "Mia Foster",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&auto=format&fit=crop",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 70),
      readBy: [{ _id: "u3", name: "Jack Harris" }],
      attachments: [
        {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1545231027-637d2f6210f8?w=600&auto=format",
          preview: "New logo design",
        },
      ],
      isEdited: false,
      reactions: [
        {
          emoji: "🔥",
          users: [{ _id: "u3", name: "Jack Harris" }],
        },
      ],
    },
    {
      content: "Final version of the marketing plan is up. Check the folder 📁",
      sender: {
        _id: "u6",
        name: "Olivia Moore",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&auto=format&fit=crop",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 80),
      readBy: [{ _id: "u2", name: "Anna Smith" }],
      attachments: [],
      isEdited: false,
      reactions: [
        {
          emoji: "👍",
          users: [{ _id: "u2", name: "Anna Smith" }],
        },
      ],
    },
  ];