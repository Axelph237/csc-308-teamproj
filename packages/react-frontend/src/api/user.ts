interface Diary {
    title: string;
    date: string;
    entries: DiaryEntry[];
}

export interface DiaryEntry {
    title: string,
    date: string,
    body: string
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
                    title: "Dear diary",
                    date: "07-08-04",
                    body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
                        "\n" +
                        "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
                        "\n" +
                        "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
                        "\n" +
                        "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
                        "\n" +
                        "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta."
                },
                {
                    title: "Dear diary",
                    date: "07-08-04",
                    body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
                        "\n" +
                        "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
                        "\n" +
                        "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
                        "\n" +
                        "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
                        "\n" +
                        "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta."
                },
                {
                    title: "Dear diary",
                    date: "07-08-04",
                    body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
                        "\n" +
                        "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
                        "\n" +
                        "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
                        "\n" +
                        "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
                        "\n" +
                        "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta."
                }
            ]
        },
        {
            title: "A Second Diary",
            date: "12-01-2025",
            entries: [
                {
                    title: "Dear diary",
                    date: "07-08-04",
                    body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
                        "\n" +
                        "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
                        "\n" +
                        "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
                        "\n" +
                        "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
                        "\n" +
                        "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta."
                },
                {
                    title: "Dear diary",
                    date: "07-08-04",
                    body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
                        "\n" +
                        "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
                        "\n" +
                        "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
                        "\n" +
                        "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
                        "\n" +
                        "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta."
                },
                {
                    title: "Dear diary",
                    date: "07-08-04",
                    body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
                        "\n" +
                        "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
                        "\n" +
                        "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
                        "\n" +
                        "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
                        "\n" +
                        "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta."
                }
            ]
        },
        {
            title: "Auguest",
            date: "12-01-2025",
            entries: [
                {
                    title: "Dear diary",
                    date: "07-08-04",
                    body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
                        "\n" +
                        "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
                        "\n" +
                        "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
                        "\n" +
                        "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
                        "\n" +
                        "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta."
                },
                {
                    title: "Dear diary",
                    date: "07-08-04",
                    body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
                        "\n" +
                        "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
                        "\n" +
                        "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
                        "\n" +
                        "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
                        "\n" +
                        "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta."
                },
                {
                    title: "Dear diary",
                    date: "07-08-04",
                    body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
                        "\n" +
                        "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
                        "\n" +
                        "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
                        "\n" +
                        "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
                        "\n" +
                        "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta."
                }
            ]
        },
        {
            title: "Hi there :)",
            date: "12-01-2025",
            entries: [
                {
                    title: "Dear diary",
                    date: "07-08-04",
                    body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
                        "\n" +
                        "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
                        "\n" +
                        "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
                        "\n" +
                        "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
                        "\n" +
                        "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta."
                },
                {
                    title: "Dear diary",
                    date: "07-08-04",
                    body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
                        "\n" +
                        "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
                        "\n" +
                        "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
                        "\n" +
                        "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
                        "\n" +
                        "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta."
                },
                {
                    title: "Dear diary",
                    date: "07-08-04",
                    body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus fringilla vehicula rutrum habitasse arcu pretium integer pellentesque. Adipiscing efficitur praesent enim varius; posuere finibus pellentesque ornare. Et turpis magnis dapibus adipiscing eros scelerisque cras. Urna vulputate mus himenaeos ad quis gravida vulputate euismod. Eu mi tellus tincidunt sagittis magna congue semper ac. Fringilla magna cubilia per, risus suscipit ipsum. Mi sed vestibulum tincidunt amet, sollicitudin parturient. Venenatis himenaeos eu; natoque netus at at odio.\n" +
                        "\n" +
                        "Fames vivamus laoreet nisl consectetur netus tellus at. Posuere montes lacinia velit posuere accumsan lobortis risus curabitur. Curae porttitor dis torquent sapien aliquet aliquam adipiscing neque. Quisque metus nascetur mattis vitae torquent commodo aliquet. Tellus dictum sem ligula sociosqu integer sociosqu. Sagittis vivamus fermentum morbi molestie odio turpis eros. Posuere arcu malesuada neque mattis feugiat tempus ante finibus curabitur.\n" +
                        "\n" +
                        "Natoque et iaculis aenean ultrices parturient sociosqu mattis parturient accumsan. Tempus porta dignissim magnis himenaeos, consequat dui. Tortor maecenas ex habitant bibendum maecenas phasellus. Eleifend ullamcorper hac, porta imperdiet proin ex posuere. Tincidunt urna mauris habitasse pulvinar nunc nibh. Donec odio ornare semper donec blandit sagittis commodo? Dis vehicula purus litora urna odio sodales id? Curae blandit pharetra vulputate leo massa, etiam duis.\n" +
                        "\n" +
                        "Fermentum odio luctus erat hendrerit purus tincidunt. Malesuada nostra consequat volutpat class nam cursus lobortis magna montes. Augue imperdiet nibh curae malesuada praesent vitae quisque maecenas ullamcorper. Tristique aliquet leo bibendum cras ipsum. Vivamus turpis nulla tortor lectus nisl. Lacus integer accumsan ipsum praesent dis vestibulum lacus laoreet.\n" +
                        "\n" +
                        "Cursus posuere fusce torquent est imperdiet. Hac est neque torquent augue pulvinar suscipit sit. Tortor amet penatibus inceptos vehicula volutpat condimentum habitasse montes. Donec aptent pellentesque curabitur mollis nisl metus magna auctor facilisi. Potenti lacinia senectus mattis ex nascetur. Lobortis sagittis neque ultrices nulla donec per scelerisque. Venenatis nunc enim feugiat feugiat sollicitudin rhoncus fusce. Cursus volutpat proin parturient eget ornare porta."
                }
            ]
        }
    ]
}

export async function getUser() {
    const {username, email, password} = user;
    return {username, email, password};
}

// Update getUserDiaries to return proper type
export async function getUserDiaries(): Promise<{ title: string; date: string }[]> {
    return user.diaries.map(({title, date}) => ({title, date}));
}

// Ensure getDiaryEntries has the correct return type
export async function getDiaryEntries(title: string): Promise<DiaryEntry[]> {
    const matchingDiaries = user.diaries.filter((diary) => diary.title === title);

    // Map through each matching diary and collect all entries
    const allEntries = matchingDiaries.flatMap(diary => diary.entries);

    return allEntries;
}