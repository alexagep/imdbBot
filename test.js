const staticKeyboard = {
  reply_markup: JSON.stringify({
    keyboard: [["Search", "Top250"]],
    one_time_keyboard: false,
    resize_keyboard: true,
  }),
};



const popupKeyboard = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
          { text: "Top 50 Movies", callback_data: `next_${0}` },
          { text: "Search Movie", callback_data: "search" },
      ],
      [
        { text: 'Casts', callback_data: 'casts' },
        { text: 'Option 4', callback_data: 'option_4' },
      ],
      [{ text: 'Close', callback_data: 'close' }],
    ],
  }),
};