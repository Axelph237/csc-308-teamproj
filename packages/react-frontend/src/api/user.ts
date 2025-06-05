interface Diary {
  title: string;
  date: string;
  entries: DiaryEntry[];
}

export interface DiaryEntry {
  title: string;
  date: string;
  body: string;
}

const user = {
  username: "DiaryUser1085",
  email: "DiaryUser1085@gmail.com",
  password: "fake.password1234!!",
  diaries: [
    {
      title: "Diary 1",
      date: "12-01-2025",
      entries: [
        {
          title: "Morning",
          date: "03-10-25",
          body:
            "## Morning  \n" +
            "\n" +
            "I woke up around **6:30 AM**, feeling groggy but excited for the day ahead. After a quick stretch, I made my usual cup of coffee ☕ and sat down to read the news. The headlines were a mix of politics and science—one article about a **new AI breakthrough** really caught my attention.  \n" +
            "\n" +
            "Breakfast was simple: scrambled eggs 🍳, toast, and a glass of orange juice. I took a moment to plan my schedule for the day:  \n" +
            "\n" +
            "1. Finish coding the markdown parser 🖥️  \n" +
            "2. Reply to emails 📧  \n" +
            "3. Go for a walk outside 🚶‍♂️  \n" +
            "\n" +
            "By **9:00 AM**, I was deep into debugging some weird rendering issues in my Markdown parser. The nested lists weren’t rendering correctly, and I had to trace through multiple functions before spotting a missing closing tag. It’s funny how the smallest errors can cause the biggest headaches.  \n" +
            "\n" +
            "## Afternoon  \n" +
            "\n" +
            "Lunchtime came and went. I made a sandwich 🥪 and stared at my screen, trying to work through a stubborn issue with inline formatting. Around **2:30 PM**, I decided to take a short break and went for a walk around the block. The weather was nice—sunny but with a cool breeze. It felt refreshing to step away from the screen for a bit.  \n" +
            "\n" +
            "When I got back, I had a meeting with a colleague about our next project. We brainstormed some cool ideas, including the possibility of integrating **syntax highlighting** into the parser. That would be a fun challenge.  \n",
        },
        {
          title: "A Slow Start",
          date: "03-11-25",
          body:
            "## A Slow Start  \n" +
            "\n" +
            "Woke up later than usual today—around **8:15 AM**. I must have hit snooze a few too many times. Made some coffee ☕ and sat on the couch for a bit, scrolling through my phone. Social media was full of the usual: memes, tech news, and heated discussions about the latest **JavaScript framework wars**.  \n" +
            "\n" +
            "Eventually, I got up and decided to be productive. Opened up my laptop and reviewed some code I wrote last night. It’s amazing how things that seemed fine at **midnight** look completely broken in the morning. A few logical errors stood out immediately, so I spent the next hour refactoring.  \n" +
            "\n" +
            "## Midday Challenges  \n" +
            "\n" +
            "For lunch, I made pasta 🍝 and read through some documentation while eating. I ran into an issue with **Markdown tables not rendering correctly** in my parser, so I wrote a few test cases to isolate the problem. Here’s what was breaking:  \n" +
            "\n" +
            "| Time  | Task               | Status  |  \n" +
            "|-------|--------------------|---------|  \n" +
            "| 10 AM | Debugging lists    | ✅ Done |  \n" +
            "| 11 AM | Fixing tables      | ❌ Bug  |  \n" +
            "| 12 PM | Writing tests      | ✅ Done |  \n" +
            "\n" +
            "Turns out, I had a rogue pipe (`|`) in one of my regex patterns. Who knew a tiny character could cause so much trouble? Once I fixed it, the tables displayed perfectly.  \n" +
            "\n" +
            "## Evening Reflection  \n" +
            "\n" +
            "I wrapped up my work by **7:00 PM**, feeling accomplished but also a bit drained. Made some tea 🍵 and put on a podcast about **functional programming** while winding down. The topic was interesting, but I kept getting distracted by thoughts about tomorrow’s tasks. Hopefully, I wake up on time and have a smoother start than today.  \n",
        },
        {
          title: "Morning Musings",
          date: "03-12-25",
          body:
            "## Morning Musings  \n" +
            "\n" +
            "Today started with an early morning workout. **6:00 AM**, alarm blaring, I forced myself out of bed and into my running shoes. A quick jog 🏃‍♂️ through the park was refreshing, though my legs felt heavy from sitting too much yesterday.  \n" +
            "\n" +
            "Breakfast was just cereal and milk—quick and easy. Opened up my laptop and checked my messages. A friend sent me a cool article about **text parsing algorithms**, which felt timely given my current work on the Markdown parser. The article mentioned some techniques I hadn’t considered before, so I bookmarked it for later.  \n" +
            "\n" +
            "## Afternoon Work  \n" +
            "\n" +
            "The bulk of my day was spent improving **blockquote handling** in my parser. I noticed that nested blockquotes weren’t rendering correctly, so I spent time rewriting some logic. The test cases I created helped catch a few edge cases, like this:  \n" +
            "\n" +
            "> This is a simple blockquote  \n" +
            ">> And this is a nested one  \n" +
            ">>> It keeps going deeper!  \n" +
            "\n" +
            "Markdown parsing can be frustrating, but there’s something satisfying about finally getting things to work.  \n" +
            "\n" +
            "## Wrapping Up  \n" +
            "\n" +
            "As the sun set, I took a break to play some guitar 🎸. It was a nice way to clear my head after hours of debugging. Tomorrow, I’ll tackle **escaping special characters**—not looking forward to it, but it has to be done. Maybe I’ll treat myself to an extra cup of coffee ☕ for motivation.  \n",
        },
      ],
    },
    {
      title: "A Second Diary",
      date: "12-01-2025",
      entries: [
        {
          title: "Dear diary",
          date: "07-08-04",
          body:
            "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
            "\n" +
            "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
            "\n" +
            "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
            "\n" +
            "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
            "\n" +
            "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta.",
        },
        {
          title: "Dear diary",
          date: "07-08-04",
          body:
            "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
            "\n" +
            "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
            "\n" +
            "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
            "\n" +
            "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
            "\n" +
            "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta.",
        },
        {
          title: "Dear diary",
          date: "07-08-04",
          body:
            "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
            "\n" +
            "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
            "\n" +
            "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
            "\n" +
            "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
            "\n" +
            "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta.",
        },
      ],
    },
    {
      title: "Auguest",
      date: "12-01-2025",
      entries: [
        {
          title: "Dear diary",
          date: "07-08-04",
          body:
            "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
            "\n" +
            "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
            "\n" +
            "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
            "\n" +
            "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
            "\n" +
            "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta.",
        },
        {
          title: "Dear diary",
          date: "07-08-04",
          body:
            "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
            "\n" +
            "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
            "\n" +
            "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
            "\n" +
            "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
            "\n" +
            "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta.",
        },
        {
          title: "Dear diary",
          date: "07-08-04",
          body:
            "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
            "\n" +
            "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
            "\n" +
            "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
            "\n" +
            "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
            "\n" +
            "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta.",
        },
      ],
    },
    {
      title: "Hi there :)",
      date: "12-01-2025",
      entries: [
        {
          title: "Dear diary",
          date: "07-08-04",
          body:
            "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
            "\n" +
            "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
            "\n" +
            "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
            "\n" +
            "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
            "\n" +
            "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta.",
        },
        {
          title: "Dear diary",
          date: "07-08-04",
          body:
            "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
            "\n" +
            "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
            "\n" +
            "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
            "\n" +
            "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
            "\n" +
            "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta.",
        },
        {
          title: "Dear diary",
          date: "07-08-04",
          body:
            "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
            "\n" +
            "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
            "\n" +
            "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
            "\n" +
            "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
            "\n" +
            "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta.",
        },
      ],
    },
  ],
};

export async function getUser() {
  const { username, email, password } = user;
  return { username, email, password };
}

// Update getUserDiaries to return proper type
export async function getUserDiaries(): Promise<
  { title: string; date: string }[]
> {
  return user.diaries.map(({ title, date }) => ({ title, date }));
}

// Ensure getDiaryEntries has the correct return type
export async function getDiaryEntries(title: string): Promise<DiaryEntry[]> {
  const matchingDiaries = user.diaries.filter((diary) => diary.title === title);

  // Map through each matching diary and collect all entries
  const allEntries = matchingDiaries.flatMap((diary) => diary.entries);

  return allEntries;
}

export function getRandomDiaryPage() {
  const diary = user.diaries[Math.floor(Math.random() * user.diaries.length)];

  return diary.entries[Math.floor(Math.random() * diary.entries.length)];
}
