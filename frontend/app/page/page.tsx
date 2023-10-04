'use client'

import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu venenatis diam, in porta tortor. Donec cursus, tortor vel consectetur euismod, dui orci dignissim justo, sit amet fermentum erat magna id neque. In interdum metus tellus, id volutpat ante consectetur ut. Phasellus accumsan ut leo et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed libero orci, aliquam nec efficitur ac, auctor in ex. Maecenas sodales dictum sapien vel mattis. Nulla vitae auctor urna. Sed dignissim quam augue, quis viverra massa posuere quis. Proin tortor mauris, porttitor quis commodo at, suscipit et libero. Nullam turpis odio, ullamcorper et tempor id, mollis in turpis. Donec facilisis lorem interdum fermentum aliquet.
      </p>
      <p>
        Fusce maximus eu metus quis porta. Nulla facilisi. Ut faucibus interdum nisl et accumsan. Proin rutrum felis neque, in varius ante malesuada auctor. Maecenas id quam urna. Mauris at posuere enim, quis venenatis turpis. Pellentesque justo sapien, finibus sed ullamcorper ac, tincidunt ut lectus. Duis eu felis blandit, blandit ex feugiat, aliquet lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas feugiat gravida pellentesque.
      </p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
        <li>Sublist:
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
        </li>
      </ul>
      <hr/>
      <ol>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
        <li>Sublist:
          <ol>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ol>
        </li>
      </ol>
      <p>
        Fusce maximus eu metus quis porta. <a href="#">Nulla facilisi.</a>
      </p>
      <img src="https://via.placeholder.com/1920x1080" alt="Placeholder Image" />
      <p>
        Fusce maximus eu metus quis porta. Nulla facilisi. Ut faucibus interdum nisl et accumsan. Proin rutrum felis neque, in varius ante malesuada auctor. Maecenas id quam urna. Mauris at posuere enim, quis venenatis turpis. Pellentesque justo sapien, finibus sed ullamcorper ac, tincidunt ut lectus. Duis eu felis blandit, blandit ex feugiat, aliquet lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas feugiat gravida pellentesque.
      </p>
    </main>
  )
}
