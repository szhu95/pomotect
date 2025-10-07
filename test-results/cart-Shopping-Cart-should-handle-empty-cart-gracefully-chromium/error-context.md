# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - link "Kolf" [ref=e6]:
        - /url: /
        - img "Kolf" [ref=e7]
      - generic [ref=e8]:
        - navigation [ref=e9]:
          - link "ORIGINS" [ref=e10]:
            - /url: /about/
          - link "PRO SHOP" [ref=e11]:
            - /url: /products/
          - link "TEE IT UP" [ref=e12]:
            - /url: /contact/
        - link "CART Cart" [ref=e13]:
          - /url: /cart/
          - generic [ref=e14]: CART
          - img "Cart" [ref=e16]
  - main [ref=e17]:
    - generic [ref=e22]:
      - img "Golf Cart" [ref=e25]
      - heading "Your golf cart is ready" [level=2] [ref=e26]
      - paragraph [ref=e27]: Load up with the perfect gear for your round
      - link "BROWSE COLLECTION" [ref=e28] [cursor=pointer]:
        - /url: /products/
        - button "BROWSE COLLECTION" [ref=e29]
  - button "Open Next.js Dev Tools" [ref=e35] [cursor=pointer]:
    - img [ref=e36] [cursor=pointer]
  - alert [ref=e39]
```