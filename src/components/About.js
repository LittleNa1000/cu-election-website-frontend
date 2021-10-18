import Navbar from "./Navbar";

export function About({ user, Logout }) {
  return (
    <div>
      <Navbar user={user} Logout={Logout} />
      <h1 className="my-5 px-5">About</h1>
      <p className="my-5 px-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis adipiscing
        eleifend non, cras non. Non ante sed nulla amet tellus. Tempus posuere
        et ornare rhoncus, mattis accumsan id lectus. Nec faucibus dui, turpis
        accumsan. Velit non vel posuere ornare hac urna, interdum. Proin aliquet
        tortor cras vestibulum facilisis aliquet dis vulputate. Odio sit amet
        vitae egestas diam amet sit. Et tincidunt ut facilisis dignissim turpis.
        Senectus aenean convallis elit, habitasse et egestas turpis. Turpis
        neque euismod arcu et ultricies. Mauris nunc eget libero vitae velit
        semper neque, cursus. Tempor at sollicitudin quisque nec, sed quisque
        massa nunc in. Venenatis, diam sagittis neque nulla in egestas augue
        scelerisque. Ut enim mattis at mattis elit ornare sit semper. Bibendum
        suspendisse dignissim augue iaculis gravida lobortis ut. Id nisl
        interdum cursus placerat. Eleifend justo, mauris eu laoreet justo
        lobortis. Volutpat tellus est morbi egestas etiam nunc, ut sed.
        Pellentesque euismod nec dolor feugiat faucibus quisque.
      </p>
    </div>
  );
}
